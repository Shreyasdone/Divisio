import Expense from '../models/Expense.js';
import User from '../models/User.js';

/**
 * GET /balances
 * Computes and returns each user's financial standing based on all recorded expenses.
 * Assumes all expenses are split equally among all users.
 * 
 * @route GET /balances
 * @access Public
 */
const getBalances = async (req, res, next) => {
  try {
    // Fetch all users
    const users = await User.find().lean();
    const userCount = users.length;

    // Initialize balance map
    const balances = {};
    users.forEach(u => { balances[u._id] = 0; });

    // Fetch all expenses
    const expenses = await Expense.find().lean();

    // Compute net balances (equal split assumed)
    for (let exp of expenses) {
      // creditor gets full amount
      balances[exp.paidBy] += exp.amount;
      // each user pays their share
      const share = exp.amount / userCount;
      users.forEach(u => {
        balances[u._id] -= share;
      });
    }

    console.log(balances);
    // Build response with owes/owed
    const result = users.map(u => {
      const bal = Math.round((balances[u._id] + Number.EPSILON) * 100) / 100;
      return {
        name: u.name,
        owes: bal < 0 ? Math.abs(bal) : 0,
        owed: bal > 0 ? bal : 0
      };
    });

    res.json({ success: true, data: result, message: "Balances computed successfully" });

  } catch (err) {
    next(err);
  }
};


/**
 * GET /settlements
 * Returns an array of transfers { from, to, amount }
 * that will settle all debts in as few transactions as possible.
 * @route GET /settlements
 * @access Public
 */
export const getSettlements = async (req, res, next) => {
  try {
    // Fetch users and build initial zeroed balance map
    const users = await User.find().lean();
    const balances = {};
    users.forEach(u => { balances[u._id] = 0; });

    // Fetch expenses and compute net balances (equal split)
    const expenses = await Expense.find().lean();
    const userCount = users.length;

    for (let exp of expenses) {
      balances[exp.paidBy] += exp.amount;
      const share = exp.amount / userCount;
      users.forEach(u => { balances[u._id] -= share; });
    }

    // Build sorted creditor & debtor lists
    const creditors = [];
    const debtors  = [];

    users.forEach(u => {
      const bal = Math.round((balances[u._id] + Number.EPSILON) * 100) / 100;
      if (bal > 0) creditors.push({ id: u._id, name: u.name, amt: bal });
      else if (bal < 0) debtors.push({ id: u._id, name: u.name, amt: -bal });
    });

    // Sort descending by amount
    creditors.sort((a, b) => b.amt - a.amt);
    debtors.sort((a, b) => b.amt - a.amt);

    // Greedy settlement: pair largest debtor with largest creditor
    const settlements = [];
    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
      const debtor   = debtors[i];
      const creditor = creditors[j];
      const transfer = Math.min(debtor.amt, creditor.amt);

      settlements.push({
        from:   debtor.name,
        to:     creditor.name,
        amount: Math.round((transfer + Number.EPSILON) * 100) / 100
      });

      // Decrement amounts
      debtor.amt   -= transfer;
      creditor.amt -= transfer;

      // Move pointer if settled
      if (debtor.amt < 1e-8)   i++;
      if (creditor.amt < 1e-8) j++;
    }

    return res.json({ success: true, data: settlements, message: "Settlements computed successfully" });

  } catch (err) {
    next(err);
  }
};

export default {
    getBalances,
    getSettlements
}

