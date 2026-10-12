# My Shop - MERN E-Commerce Website

React (Vite + Tailwind) frontend, Node + Express backend, MongoDB (Mongoose) database.

## Features

**Customer**
- Sign up / Sign in (passwords hashed with bcrypt, login with JWT token)
- Browse products with search, category filter, price range, sorting and pagination
- Product details page, add to cart, change quantity, remove items
- Checkout with shipping address (Cash on Delivery)
- My Orders page, cancel a Pending order

**Admin**
- Add, edit and delete products (list is paginated)
- See all orders with customer and address, change order status
  (Pending, Shipped, Delivered, Cancelled)

**Security / correctness**
- Admin routes are protected on the backend (JWT + role check), not only in the React pages
- Price and stock are always checked on the server when an order is placed
- Stock is reduced safely when ordering and given back when an order is cancelled
- Input validation on signup, signin, products and orders

## 1. Install

```bash
cd backend
npm install

cd ../frontend
npm install
```

## 2. Environment variables

Create `backend/.env` (copy `backend/.env.example`) and fill in your own values:

```
PORT=5001
MONGO_URI=your MongoDB connection string
JWT_SECRET=a long random text
```

Never share or commit the `.env` file (`backend/.gitignore` already ignores it).

The frontend calls `http://localhost:5001/api` by default. If your backend runs somewhere else,
create `frontend/.env` with `VITE_API_URL=https://your-backend-url/api`.

## 3. Run

Open two terminals:

```bash
cd backend
npm run dev        # or: npm start

cd frontend
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

## 4. First-time setup

1. (Optional) add 14 sample products, so you can test search and pagination quickly:
   ```bash
   cd backend
   node seedProducts.js
   ```
2. Sign up from the website.
3. Make your account an admin (run from the `backend` folder, use your own email):
   ```bash
   node makeAdmin.js youremail@example.com
   ```
4. Sign out and sign in again. Admins go to the product list and get
   "Manage Products" and "Manage Orders" links in the navbar.

## Pages

| Page | Address | Who |
|---|---|---|
| Sign in | `/` | everyone |
| Sign up | `/signup` | everyone |
| Shop (search, filters) | `/home` | everyone |
| Product details | `/product/:id` | everyone |
| Cart | `/cart` | everyone |
| Checkout | `/checkout` | logged in |
| My orders | `/orders` | logged in |
| Product list / add / edit | `/admin/products`, `/admin/products/add`, `/admin/products/:id/edit` | admin |
| All orders | `/admin/orders` | admin |

## API

| Method and address | Access |
|---|---|
| `POST /api/auth/signup`, `POST /api/auth/signin` | public |
| `GET /api/products` (query: `search, category, minPrice, maxPrice, sort, page, limit`) | public |
| `GET /api/products/categories`, `GET /api/products/:id` | public |
| `POST /api/products/add`, `PUT /api/products/update/:id`, `DELETE /api/products/delete/:id` | admin |
| `POST /api/orders` (place order), `GET /api/orders/my`, `PUT /api/orders/cancel/:id` | logged in |
| `GET /api/orders`, `PUT /api/orders/status/:id` | admin |

`sort` can be `newest` (default), `price_asc`, `price_desc` or `title_asc`.

## Folder structure

```
backend/
  config/db.js
  controllers/   auth_controller.js, product_controller.js, order_controller.js
  middleware/    auth_middleware.js  (verifyToken, isAdmin)
  models/        user_model.js, product_model.js, order_model.js
  routes/        auth_Routes.js, product_Routes.js, order_Routes.js
  server.js, makeAdmin.js, seedProducts.js
frontend/src/
  api/axios.js            axios instance (adds the token to every request)
  utils/cart.js           cart saved in localStorage
  components/             Navbar, AdminRoute, ProtectedRoute
  screens/                Signin, Signup, Home, ProductDetails, Cart, Checkout, MyOrders
  admin/                  ProductList, AddProduct, EditProduct, OrderList
```

## Good to know

- The cart is saved in the browser (localStorage) and cleared on logout. Prices shown in the cart
  are the ones from when the item was added; the real price and stock are checked again on the server
  when the order is placed.
- Only Cash on Delivery is available. There is no online payment gateway.
- Product images are image URLs (no file upload).
- Login lasts 1 day. After that, sign in again.
- Optional cleanup in `frontend`: `npm uninstall bcrypt bcryptjs react-router-dom`
  (these 3 packages are installed but not used).
