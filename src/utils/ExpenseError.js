// Custom error class to standardize error responses across the Expense API
// Extends the built-in Error to include HTTP status codes

class ExpenseError extends Error {
  /**
   * @param {number} status - HTTP status code for the error
   * @param {string} message - Descriptive error message
   */
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default ExpenseError;
