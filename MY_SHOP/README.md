# My Shop — Full-Stack MERN E-Commerce Website

A full-stack e-commerce web application built with **React, Vite, Tailwind CSS, Node.js, Express, and MongoDB**. It includes customer authentication, product browsing, search and filtering, a shopping cart, Cash on Delivery checkout, order tracking, and an admin dashboard for managing products and orders.

> **Project status:** Core shopping and admin workflows are implemented. This README documents the features present in the current project and separates optional future enhancements from existing functionality.

---

📸 VIDEO OUTPUT : https://drive.google.com/file/d/1qCEbCB2nDDMXNY0LLyJT5Vd8ooN0mYwU/view?usp=sharing

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Run the Project](#run-the-project)
- [First-Time Setup](#first-time-setup)
- [Pages and Routes](#pages-and-routes)
- [API Documentation](#api-documentation)
- [Search, Filters, Sorting, and Pagination](#search-filters-sorting-and-pagination)
- [Authentication and Authorization](#authentication-and-authorization)
- [Product and Stock Management](#product-and-stock-management)
- [Cart, Checkout, and Orders](#cart-checkout-and-orders)
- [Database Models](#database-models)
- [Validation and Error Handling](#validation-and-error-handling)
- [Security Notes](#security-notes)
- [Testing Checklist](#testing-checklist)
- [Production Deployment](#production-deployment)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)
- [Useful Commands](#useful-commands)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**My Shop** is a learning-focused full-stack e-commerce project designed to demonstrate how a React frontend communicates with a REST API and a MongoDB database.

### Main user roles

- **Guest:** Can browse the shop, search and filter products, and view product details.
- **Customer:** Can sign up, sign in, manage a cart, place Cash on Delivery orders, view their orders, and cancel eligible pending orders.
- **Admin:** Can add, edit, and delete products, view all customer orders, and update order statuses.

## Features

### Customer-facing features

- **Account registration:** Create an account with a name, email address, and password.
- **Sign in:** Authenticate using email and password.
- **Password hashing:** Passwords are hashed with `bcryptjs` before being saved.
- **JWT authentication:** Successful sign-in returns a JSON Web Token (JWT).
- **Product catalogue:** Browse available products.
- **Product details:** Open an individual product page.
- **Search:** Search products using the supported search query.
- **Category filter:** Filter products by category.
- **Price filter:** Set minimum and maximum price filters.
- **Sorting:** Sort by newest, price (low to high), price (high to low), or title.
- **Pagination:** Browse large product lists in pages.
- **Shopping cart:** Add products, update quantities, and remove items.
- **Cart persistence:** Cart data is stored in browser `localStorage`.
- **Checkout form:** Submit a shipping name, phone number, address, city, and PIN code.
- **Cash on Delivery (COD):** Place an order without an online payment gateway.
- **My Orders:** View orders belonging to the signed-in customer.
- **Order cancellation:** Cancel an order while its status is `Pending`, subject to backend rules.
- **Responsive UI:** The interface can be adapted to desktop and mobile screen sizes.

### Admin features

- **Admin-only product management:** View the product list.
- **Add products:** Create a product with the supported product fields.
- **Edit products:** Update an existing product.
- **Delete products:** Remove a product.
- **Product-list pagination:** Navigate product records in the admin list.
- **Order management:** View orders across customers.
- **Customer and delivery information:** Inspect order details needed to process delivery.
- **Update order status:** Set an eligible order to `Pending`, `Shipped`, `Delivered`, or `Cancelled`.
- **Backend authorization:** Admin APIs verify both the JWT and the user's admin role. Hiding admin pages in React is not the only protection.

### Reliability and business rules

- The backend validates important product, authentication, and order input.
- The backend reads current product prices from MongoDB when an order is placed; it does not trust the total submitted by the browser.
- The backend checks product stock before accepting an order.
- Stock is reduced when an order is successfully placed.
- If stock becomes insufficient during the ordering process, the backend attempts to restore stock already deducted in that attempt.
- When an eligible order is cancelled, its stock is restored.
- Order and product IDs are validated before relevant database operations.

---

## Technology Stack

| Area | Technology | Purpose |
|---|---|---|
| Frontend | React | Builds reusable UI components and pages |
| Frontend tooling | Vite | Development server and production build |
| Styling | Tailwind CSS | Utility-based styling |
| Routing | React Router | Client-side page navigation |
| HTTP requests | Axios | Calls the backend REST API |
| Backend runtime | Node.js | Runs JavaScript on the server |
| Backend framework | Express | Defines API routes and middleware |
| Database | MongoDB | Stores users, products, and orders |
| ODM | Mongoose | Models and queries MongoDB documents |
| Authentication | JSON Web Token (`jsonwebtoken`) | Authenticates API requests |
| Password security | `bcryptjs` | Hashes and compares passwords |
| Configuration | `dotenv` | Loads environment variables |
| Cross-origin requests | `cors` | Allows configured frontend origins to call the API |
| Development | Nodemon | Restarts the backend during development |

---

## How It Works

```text
Customer / Admin
       |
       v
React + Vite Frontend
       |
       | Axios HTTP requests
       v
Node.js + Express REST API
       |
       | Mongoose queries
       v
MongoDB Database
```

1. A user interacts with a page in the React frontend.
2. Axios sends an HTTP request to the Express backend.
3. Public endpoints handle requests that do not require a login.
4. Protected endpoints validate the JWT. Admin endpoints also check the user's role.
5. Controllers validate input and perform business logic.
6. Mongoose reads or updates MongoDB.
7. The backend returns a JSON response to the frontend.

**Important:** The frontend and backend are separate applications. In production, deploy the backend and configure the frontend to use its public HTTPS API URL.

---

## Project Structure

```text
E-COMMERCE/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── admin/
│   │   │   ├── AddProduct.jsx
│   │   │   ├── EditProduct.jsx
│   │   │   ├── OrderList.jsx
│   │   │   └── ProductList.jsx
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── screens/
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Signin.jsx
│   │   │   └── Signup.jsx
│   │   ├── utils/
│   │   │   └── cart.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth_controller.js
│   │   ├── order_controller.js
│   │   └── product_controller.js
│   ├── middleware/
│   │   └── auth_middleware.js
│   ├── models/
│   │   ├── order_model.js
│   │   ├── product_model.js
│   │   └── user_model.js
│   ├── routes/
│   │   ├── auth_Routes.js
│   │   ├── order_Routes.js
│   │   └── product_Routes.js
│   ├── .env.example
│   ├── makeAdmin.js
│   ├── seedProducts.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Requirements

Install these before starting:

- **Node.js:** Use a current supported LTS release compatible with the dependencies.
- **npm:** Included with Node.js.
- **MongoDB:** A local MongoDB server or a MongoDB Atlas cluster.
- **Git:** Recommended for version control.
- **Code editor:** VS Code or another editor.

Check the installed versions:

```bash
node -v
npm -v
```

---

## Installation and Setup

### 1. Download or clone the repository

If using Git:

```bash
git clone YOUR_REPOSITORY_URL
cd E-COMMERCE
```

Replace `YOUR_REPOSITORY_URL` with your actual GitHub repository URL. If you downloaded a ZIP, extract it and open the `E-COMMERCE` folder in your code editor.

### 2. Install backend dependencies

Open a terminal in the project root:

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

Open another terminal, or return to the root and enter:

```bash
cd frontend
npm install
```

### 4. Configure the backend environment

Inside `backend/`, create a file named `.env`. Copy the variable names from `.env.example` and set your own values. See [Environment Variables](#environment-variables).

### 5. Configure the frontend API URL if needed

The frontend API client defaults to `http://localhost:5001/api`. If your backend runs at another address, create `frontend/.env` and set `VITE_API_URL`.

---

## Environment Variables

### `backend/.env`

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/my_shop
JWT_SECRET=replace_with_a_long_random_secret
```

Use your actual MongoDB connection string. The local example above assumes a local MongoDB server. For MongoDB Atlas, use the connection string supplied by Atlas and ensure network access and database credentials are configured correctly.

### `frontend/.env` (optional for local development)

```env
VITE_API_URL=http://localhost:5001/api
```

For a deployed backend:

```env
VITE_API_URL=https://your-backend-domain.example/api
```

Replace the example domain with your real backend URL.

**Environment variable rules**

- Do not commit `.env` files or real secrets to GitHub.
- Keep `JWT_SECRET` private and use a strong random value.
- Variables prefixed with `VITE_` are exposed to frontend code. Never put passwords, database credentials, or private API secrets in them.
- If you change environment variables, restart the relevant development server.

---

## Run the Project

Run the backend and frontend in separate terminals.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

For a normal start without Nodemon:

```bash
npm start
```

The default backend port is `5001`. When the server is running, open `http://localhost:5001/`. A successful response should say that the API is running.

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

---

## First-Time Setup

### 1. Add sample products (optional)

The project includes a seed script:

```bash
cd backend
node seedProducts.js
```

Review the script before running it against any database containing important data. Seeding scripts may insert or change records.

### 2. Create a customer account

1. Open the frontend.
2. Go to the sign-up page.
3. Register with a name, email, and password.
4. Sign in with that account.

### 3. Promote your own account to admin

From the `backend` folder, run:

```bash
node makeAdmin.js your-email@example.com
```

Replace the email with the email address of the account you created. Use this script only for your own development database and trusted accounts. Do not expose an unrestricted admin-promotion command in a public production API.

### 4. Sign in again

Sign out and sign in again so the frontend receives a token/user payload reflecting the updated role. The admin navigation and admin pages should then be available.

---

## Pages and Routes

| Page | Frontend route | Access |
|---|---|---|
| Sign in | `/` | Public |
| Sign up | `/signup` | Public |
| Shop / product catalogue | `/home` | Public |
| Product details | `/product/:id` | Public |
| Shopping cart | `/cart` | Public page; checkout requires login |
| Checkout | `/checkout` | Signed-in users |
| My Orders | `/orders` | Signed-in users |
| Admin product list | `/admin/products` | Admin |
| Add product | `/admin/products/add` | Admin |
| Edit product | `/admin/products/:id/edit` | Admin |
| Admin order list | `/admin/orders` | Admin |

The route guard components improve frontend navigation, but **backend middleware is the security boundary** for protected data and actions.

---

## API Documentation

Base URL for local development:

```text
http://localhost:5001/api
```

Requests with a JSON body should use the `Content-Type: application/json` header.

### Authentication APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `POST` | `/auth/signup` | Public | Register a customer |
| `POST` | `/auth/signin` | Public | Sign in and receive a JWT |

**Example sign-up request**

```json
{
  "name": "Roushan",
  "email": "roushan@example.com",
  "password": "your-password"
}
```

**Example sign-in request**

```json
{
  "email": "roushan@example.com",
  "password": "your-password"
}
```

A successful sign-in returns a token and basic user details. Use the token on protected requests:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Product APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/products` | Public | List products; supports search, filters, sorting, and pagination |
| `GET` | `/products/categories` | Public | Get available product categories |
| `GET` | `/products/:id` | Public | Get one product |
| `POST` | `/products/add` | Admin | Create a product |
| `PUT` | `/products/update/:id` | Admin | Update a product |
| `DELETE` | `/products/delete/:id` | Admin | Delete a product |

Product creation and update requests must match the fields and validation implemented in `product_controller.js` and `product_model.js`. Product images are currently supplied as URLs rather than uploaded files.

### Order APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `POST` | `/orders` | Signed-in user | Place an order |
| `GET` | `/orders/my` | Signed-in user | Get the current user's orders |
| `PUT` | `/orders/cancel/:id` | Order owner | Cancel an eligible pending order |
| `GET` | `/orders` | Admin | Get all orders |
| `PUT` | `/orders/status/:id` | Admin | Update an order status |

**Checkout request example**

The backend expects order quantities and shipping details in the format implemented by the current order controller. A representative request is:

```json
{
  "items": [
    {
      "product": "MONGODB_PRODUCT_ID",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "fullName": "Customer Name",
    "phone": "9876543210",
    "address": "House / Street",
    "city": "Surat",
    "pincode": "395001"
  }
}
```

Check `backend/controllers/order_controller.js` for the exact accepted request structure before integrating another client or API testing tool. The server recalculates prices using current database values.

### Product list query parameters

`GET /api/products` supports these query parameters:

| Parameter | Meaning | Example |
|---|---|---|
| `search` | Search text | `?search=shirt` |
| `category` | Category filter | `?category=Clothing` |
| `minPrice` | Minimum price | `?minPrice=100` |
| `maxPrice` | Maximum price | `?maxPrice=1000` |
| `sort` | Sorting option | `?sort=price_asc` |
| `page` | Page number | `?page=2` |
| `limit` | Items per page | `?limit=8` |

Combine parameters with `&`, for example:

```text
/api/products?search=shirt&minPrice=100&maxPrice=1000&sort=price_asc&page=1&limit=8
```

Supported sort values:

- `newest` — default
- `price_asc` — lowest price first
- `price_desc` — highest price first
- `title_asc` — alphabetical title order

---

## Search, Filters, Sorting, and Pagination

The shop supports several catalogue browsing controls:

1. **Search:** Narrow the product list using a search term.
2. **Category:** Show products in a selected category.
3. **Minimum price:** Exclude products below a price.
4. **Maximum price:** Exclude products above a price.
5. **Sort order:** Choose newest, price ascending, price descending, or title ascending.
6. **Pagination:** Move between result pages instead of loading the entire catalogue at once.

The frontend sends these values as query parameters. The backend applies the corresponding query logic and returns the results. When changing a filter or search term, reset the current page to page 1 to avoid landing on an empty page.

---

## Authentication and Authorization

### Registration and sign-in flow

1. The customer submits the registration form.
2. The backend validates the name, email, and password.
3. The email is normalized to lowercase and checked for an existing account.
4. `bcryptjs` hashes the password before storage.
5. During sign-in, the backend compares the submitted password with the stored hash.
6. If credentials are valid, the server signs a JWT that expires after **one day**.
7. The frontend uses the token for protected API requests.

### Role-based access

- Normal customers can place and view their own orders.
- Customers can only cancel their own orders when they are still `Pending`.
- Admin endpoints require a valid token and an admin role.
- The signup endpoint does not allow a client to choose its own role.

### Token handling

The current project uses browser-side token handling through its frontend API setup. Browser storage has security trade-offs: JavaScript-accessible storage can be exposed if an attacker exploits an XSS vulnerability. For a production application, review token storage, XSS prevention, token expiry, logout behavior, and session strategy carefully.

---

## Product and Stock Management

### Product administration

Admins can create, edit, list, and delete products through the admin screens and protected API routes.

### Stock checks during checkout

- The server looks up products from the database.
- The server verifies that requested quantities are available.
- The server calculates the total using database prices.
- The server decreases stock when the order is created.
- The server attempts to restore deducted stock if an order attempt fails partway through.
- Stock is restored when an eligible order is cancelled.

These checks are important because browser values can be changed by users and two customers may attempt to buy the same remaining stock.

> **Production improvement:** For stronger consistency across multi-item orders and cancellations, use MongoDB transactions where supported, plus idempotency protections and carefully tested stock-restoration logic.

---

## Cart, Checkout, and Orders

### Shopping cart

- The cart is managed on the frontend.
- Cart contents are saved in `localStorage`, so they can persist across browser refreshes on the same browser.
- Users can adjust quantities and remove products.
- The cart is browser-specific and is not currently a server-synced cart shared across devices.
- Cart prices are for display; the backend rechecks prices and stock at checkout.

### Checkout

The customer supplies shipping information, then submits the order. The current payment method is **Cash on Delivery (COD)**. No online payment gateway is included.

### Order statuses

The backend supports these status values:

| Status | Meaning |
|---|---|
| `Pending` | Order has been placed and is awaiting processing |
| `Shipped` | Order has been dispatched |
| `Delivered` | Order has been delivered |
| `Cancelled` | Order has been cancelled |

Customers can cancel their own `Pending` orders. Admins can update eligible orders. According to the current controller logic, `Delivered` and `Cancelled` are terminal states and cannot be changed again through the status-update endpoint.

---

## Database Models

The project uses Mongoose models for three main entities.

### User

Stores account details, including a name, normalized email, hashed password, and role. Passwords should never be stored as plain text.

### Product

Stores catalogue information such as product title, description, price, category, image URL, and stock, according to the current schema.

### Order

Stores the customer reference, ordered product details, quantities, price snapshots, shipping address, total price, status, and timestamps, according to the current schema.

For exact field names and required fields, see:

- `backend/models/user_model.js`
- `backend/models/product_model.js`
- `backend/models/order_model.js`

---

## Validation and Error Handling

The backend validates important incoming data instead of relying only on frontend form validation.

Examples include:

- Required name and valid email during registration.
- Minimum password length.
- Duplicate account checks.
- Numeric, non-negative product prices.
- Valid stock quantities.
- Valid MongoDB document IDs for relevant product/order actions.
- Valid order quantities and shipping details.
- Allowed order status values.
- Product existence and stock availability at checkout.

API errors are returned as JSON with a message where implemented. When testing an error, check both the HTTP status code and response body in the browser console or an API client such as Thunder Client.

---

## Security Notes

Before using this project with real customers, review and improve the following:

- **Secrets:** Keep `.env` out of Git and rotate any secret that was accidentally exposed.
- **HTTPS:** Use HTTPS for deployed frontend and backend.
- **CORS:** Replace unrestricted development CORS with an allowlist of trusted frontend origins.
- **Rate limiting:** Add rate limits to sign-in, sign-up, and other abuse-prone endpoints.
- **Input validation:** Validate and constrain every request field on the server.
- **Authentication:** Use a strong JWT secret and verify tokens consistently.
- **Authorization:** Test ownership checks and admin permissions for every protected endpoint.
- **Passwords:** Continue storing only password hashes; never log passwords.
- **Database access:** Use a dedicated database user with only the permissions the app needs.
- **Admin creation:** Restrict admin promotion scripts to trusted operators and never expose them publicly.
- **Errors and logs:** Avoid sending stack traces or secrets to clients.
- **Dependencies:** Review npm audit findings and update dependencies carefully; test after updates.
- **Data integrity:** Consider transactions for multi-step order/stock operations.
- **Privacy:** Publish a privacy policy that accurately describes collected data, retention, and usage before a public launch.

This README is not a security audit. Test the implementation and deployment configuration before production use.

---

## Testing Checklist

Use this checklist before sharing a release.

### Authentication

- [ ] A new user can register.
- [ ] Duplicate email registration is rejected.
- [ ] Invalid email and short password are rejected.
- [ ] Correct credentials allow sign-in.
- [ ] Incorrect credentials are rejected.
- [ ] Protected API requests fail without a valid token.
- [ ] A regular customer cannot access admin APIs.

### Catalogue

- [ ] Products load when the database contains products.
- [ ] Search returns appropriate results.
- [ ] Category and price filters work.
- [ ] Sorting works for every supported value.
- [ ] Pagination works on first, middle, and final pages.
- [ ] An invalid product ID is handled safely.
- [ ] Empty results display a helpful message.

### Cart and checkout

- [ ] Products can be added to the cart.
- [ ] Quantities can be changed and items removed.
- [ ] Cart persists after refresh.
- [ ] Guests cannot place orders.
- [ ] Invalid shipping data is rejected.
- [ ] Out-of-stock items cannot be ordered.
- [ ] The backend calculates the correct total.
- [ ] Stock decreases after a successful order.
- [ ] Stock is restored after an eligible cancellation.

### Orders and admin

- [ ] Customers can see only their own orders.
- [ ] Customers cannot cancel another user's order.
- [ ] Customers cannot cancel an order after it leaves `Pending`.
- [ ] Admins can view all orders.
- [ ] Admins can update valid order statuses.
- [ ] Non-admin users cannot create, update, or delete products.
- [ ] Invalid order and product IDs return useful errors.

### Release

- [ ] Frontend production build succeeds.
- [ ] Backend connects to the intended database.
- [ ] Production environment variables are configured.
- [ ] API URL and CORS settings are correct.
- [ ] No private secrets are committed to Git.
- [ ] The application has been tested on mobile and desktop.

---

## Production Deployment

A typical deployment uses separate hosting for the frontend and backend, with MongoDB Atlas or another properly secured MongoDB deployment.

1. Create and secure the production database.
2. Deploy the backend to a Node.js-compatible hosting service.
3. Set `PORT`, `MONGO_URI`, and `JWT_SECRET` in the hosting provider's environment settings.
4. Configure the backend's CORS policy to allow the deployed frontend domain.
5. Deploy the frontend to a static hosting provider.
6. Set `VITE_API_URL` to the deployed backend's `/api` base URL before building the frontend.
7. Test registration, sign-in, catalogue, cart, checkout, and admin actions against production.
8. Configure a custom domain and HTTPS if needed.
9. Set up logs, backups, monitoring, and a recovery plan.

Do not use a local MongoDB address such as `127.0.0.1` for a remotely hosted backend unless the database is actually running in that same server environment.

### Build the frontend

```bash
cd frontend
npm run build
```

Vite writes the production build to `frontend/dist/`.

### Preview the production build locally

```bash
npm run preview
```

Run this from the `frontend` folder after building.

---

## Known Limitations

The following are **not currently implemented** in this project:

- Online payments (UPI, cards, payment gateway integration).
- Product image upload/storage; images are supplied as URLs.
- Wishlist or saved products.
- Product ratings and customer reviews.
- Coupons, discount codes, and promotional campaigns.
- Email/SMS order notifications.
- Shipping provider integration and live tracking.
- Returns and refunds workflow.
- A server-synced cart shared across devices.
- Automated test suite.
- Advanced analytics and sales reports.
- Multi-vendor support.
- Dedicated native Android/iOS applications.

Do not describe these as completed features unless they are implemented and tested.

---

## Future Improvements

Potential improvements for later versions:

1. Integrate a payment provider with verified payment webhooks.
2. Add product image uploads using secure object storage.
3. Add wishlist, ratings, reviews, and related products.
4. Add coupon and discount management.
5. Add email notifications for signup and order updates.
6. Add shipment tracking and return/refund workflows.
7. Add stronger request validation, rate limiting, and automated tests.
8. Add inventory reporting and admin analytics.
9. Improve accessibility, loading states, empty states, and error messages.
10. Add Docker-based local development and CI checks.
11. Create a Progressive Web App (PWA) or Android application using Capacitor, reusing the React frontend where appropriate.
12. Add structured logging, monitoring, database backups, and restore testing.

---

## Useful Commands

### Backend

```bash
cd backend
npm install
npm run dev
npm start
node seedProducts.js
node makeAdmin.js your-email@example.com
```

### Frontend

```bash
cd frontend
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

---

## Troubleshooting

### Backend cannot connect to MongoDB

- Confirm the MongoDB service or Atlas cluster is running.
- Check `MONGO_URI` in `backend/.env`.
- For Atlas, confirm database credentials and network access rules.
- Restart the backend after changing environment variables.

### Frontend cannot reach the backend

- Confirm the backend is running on port `5001`, or use its actual port.
- Check `VITE_API_URL` in `frontend/.env`.
- Ensure the URL ends in `/api`.
- Confirm the backend CORS policy permits the frontend origin.
- Restart Vite after editing frontend environment variables.

### `401 Unauthorized` or `403 Forbidden`

- Sign in again and confirm the token is being sent as `Authorization: Bearer <token>`.
- Check whether the token has expired; tokens currently expire after one day.
- For admin features, confirm the account's role is `admin` and sign in again after changing the role.

### Products do not appear

- Confirm the backend is connected to the intended database.
- Add sample products using the seed script if the database is empty.
- Check the browser console and backend terminal for API errors.
- Confirm search and filter values are not excluding all products.

### npm reports vulnerabilities

Run:

```bash
npm audit
```

Read the report to identify affected packages and available fixes. Apply compatible updates, then test the application. Avoid blindly running `npm audit fix --force`, because it can install breaking major versions.

---

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make a focused change.
4. Test the affected workflows.
5. Open a pull request with a clear description of the change.

For bug reports, include the steps to reproduce the issue, expected behavior, actual behavior, and relevant error messages. Never include passwords, JWTs, or database credentials in issue reports.

---

## License

No license is specified in this project yet. Add a `LICENSE` file before permitting reuse or redistribution. If you intend to make the project open source, choose a license that matches how you want others to use it.

---

**Built as a full-stack development project with React, Node.js, Express, and MongoDB.**
