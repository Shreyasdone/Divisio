# Project Name: Divisio

## Description

Divisio is a backend API for splitting expenses among users. It allows you to create, update, and delete expense records, compute balances, and generate minimal settlements between users. Built with Node.js, Express, and MongoDB (Mongoose), Divisio emphasizes clean, modular, and well-commented code, with robust validation and error handling.

---

## Installation Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Divisio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the project root.
   - Add the following variables (edit as needed):
     ```
     PORT=
     MONGODB_URL=
     ```

4. **Start MongoDB**
   - Ensure MongoDB is installed and running on your system.

5. **Run the Application**
   - For development (with auto-restart):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

---

## Usage Instructions

- The API will be available at `http://localhost:<PORT>` (default: 8080).
- Use tools like Postman or curl to interact with the endpoints.

### API Endpoints

#### Expenses
- `GET /expenses` — List all expenses.
- `POST /expenses` — Create a new expense.
- `PUT /expenses/:id` — Update an expense.
- `DELETE /expenses/:id` — Delete an expense.

#### Users
- `GET /people` — List all users.

#### Settlements & Balances
- `GET /balances` — Get net balances for all users.
- `GET /settlements` — Get minimal transactions to settle debts.

#### Testing Utilities
- `DELETE /test/reset` — Reset the database (clears all users and expenses).

---

## Database Schema / Setup Scripts

- **MongoDB Collections:**
  - **User**
    - `name` (String, unique, required)
  - **Expense**
    - `amount` (Number, required, min: 1)
    - `description` (String, required)
    - `paidBy` (ObjectId, ref: User, required)
    - `splitType` (String, enum: ["equal", "percentage", "exact"], default: "equal")
    - `timestamps` (createdAt, updatedAt)

- **Automatic Setup:**
  - No manual schema setup is required. Mongoose models in [`src/models/User.js`](src/models/User.js) and [`src/models/Expense.js`](src/models/Expense.js) define the collections and fields.
  - On first run, the necessary collections will be created automatically.

---

## Code Practices

- **Clean, Modular Code:** All controllers, models, routes, and utilities are separated for maintainability.
- **Validation:** Request validation is handled using Joi schemas.
- **Error Handling:** Centralized error middleware for consistent error responses.
- **Commenting:** Functions and modules include JSDoc-style comments for clarity.

---

## License

This project is licensed under the ISC License.