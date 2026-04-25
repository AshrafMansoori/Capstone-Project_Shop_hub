# Project File & Folder Structure

This section describes the working and purpose of every major file and folder in this project:

## Root Directory
- **README.md**: Project documentation, setup, and architecture overview.
- **client/**: The frontend React application.
- **server/**: The backend Node.js/Express API.

---

## client/ (Frontend)

- **eslint.config.js**: ESLint configuration for code linting.
- **index.html**: The main HTML file loaded by Vite/React.
- **package.json**: Lists frontend dependencies and scripts.
- **vite.config.js**: Vite build tool configuration.
- **public/**: Static assets (e.g., images).
    - **images/**: Product images for the store.
- **src/**: All React source code.
    - **App.jsx**: Main React component, sets up routes and layout.
    - **main.jsx**: Entry point, renders the React app.
    - **store.js**: Configures Redux store.
    - **App.css, index.css**: Global and app-specific styles.
    - **assets/**: Static assets (e.g., logos, hero images).
    - **components/**: Reusable UI components.
        - **Header.jsx**: Top navigation bar.
        - **Footer.jsx**: Footer section.
        - **AdminRoute.jsx**: Route protection for admin-only pages.
    - **screens/**: Page-level components for each route.
        - **HomeScreen.jsx**: Home page with product listings.
        - **ProductScreen.jsx**: Product details page.
        - **CartScreen.jsx**: Shopping cart page.
        - **LoginScreen.jsx, RegisterScreen.jsx**: Auth pages.
        - **ShippingScreen.jsx, PaymentScreen.jsx, PlaceOrderScreen.jsx**: Checkout process.
        - **ProfileScreen.jsx**: User profile and order history.
        - **admin/**: Admin-only screens.
            - **ProductListScreen.jsx**: Manage products.
            - **ProductEditScreen.jsx**: Edit product details.
            - **OrderListScreen.jsx**: View all orders.
    - **slices/**: Redux Toolkit slices for state management.
        - **apiSlice.js**: RTK Query API endpoints for backend communication.
        - **authSlice.js**: User authentication state.
        - **cartSlice.js**: Shopping cart state.

---

## server/ (Backend)

- **package.json**: Backend dependencies and scripts.
- **server.js**: Main Express server entry point.
- **seeder.js**: Script to seed the database with initial data.
- **.env**: Environment variables (not shown, but typically for DB connection, JWT secret, etc.).
- **controllers/**: Business logic for each resource.
    - **productController.js**: Product CRUD and search.
    - **userController.js**: User registration, login, profile.
    - **orderController.js**: Order creation, retrieval, and admin order management.
- **data/**: Static data for seeding.
    - **products.js**: Sample product data.
    - **users.js**: Sample user data.
- **middleware/**: Express middleware.
    - **authMiddleware.js**: JWT authentication and admin check.
    - **errorMiddleware.js**: Error handling and 404 responses.
- **models/**: Mongoose schemas for MongoDB.
    - **Product.js**: Product schema.
    - **User.js**: User schema.
    - **Order.js**: Order schema.
- **routes/**: Express route definitions.
    - **productRoutes.js**: Product API endpoints.
    - **userRoutes.js**: User API endpoints.
    - **orderRoutes.js**: Order API endpoints.
    - **uploadRoutes.js**: File upload endpoints.
- **utils/**:
    - **generateToken.js**: Utility to generate JWT tokens.

---

## How It Works

- The **frontend** (client) is a React SPA that communicates with the backend via REST API calls using RTK Query.
- The **backend** (server) exposes RESTful endpoints for products, users, and orders, with authentication and admin authorization.
- **Redux Toolkit** manages global state (auth, cart, API data).
- **MongoDB** stores all persistent data (users, products, orders).
- **Admin features**: Only admin users can access product/order management screens.
- **Middleware** ensures only authenticated users (and admins) can access protected routes.
- **Error handling** is centralized for clean API responses.
# MERN Stack E-Commerce Capstone Project

This project is a fully functional, full-stack E-Commerce web application built using the MERN stack (MongoDB, Express, React, Node.js). This document explains the architecture and internal workings of the project.

## Architecture Overview

The application follows a strict client-server architecture, completely decoupling the frontend user interface from the backend business logic and database.

### 1. The Backend (`/server`)

The backend is built with **Node.js** and **Express.js**. Its primary responsibility is to serve as a RESTful API that handles data operations, business logic, and security.

*   **Database (MongoDB):** We use MongoDB to store all our data. **Mongoose** is used as an Object Data Modeling (ODM) library to define strict schemas (`User`, `Product`, `Order`).
*   **Controllers (`/controllers`):** This is where the core business logic lives. For example, `productController.js` handles fetching products from the database, calculating pagination, and handling search queries.
*   **Routes (`/routes`):** Express routers map incoming HTTP requests (GET, POST, PUT, DELETE) to their corresponding Controller functions.
*   **Authentication & Security:** 
    *   Passwords are securely hashed using `bcryptjs` before being saved to the database.
    *   We use **JSON Web Tokens (JWT)** for secure, stateless authentication. When a user logs in, the server generates a token. The frontend must send this token in the `Authorization` header (`Bearer <token>`) to access protected routes (like viewing a user profile or placing an order).
*   **Middleware (`/middleware`):** 
    *   `authMiddleware.js`: Intercepts protected requests, verifies the JWT token, and checks if a user is an Admin.
    *   `errorMiddleware.js`: Catches any thrown errors and formats them into a clean JSON response instead of an HTML stack trace.

### 2. The Frontend (`/client`)

The frontend is a Single Page Application (SPA) built with **React** (initialized via Vite for blazing-fast performance).

*   **State Management (Redux Toolkit):** We use Redux to manage global state that multiple components need access to.
    *   **RTK Query (`apiSlice.js`):** This is the magic behind our data fetching. Instead of manually writing `useEffect` and `fetch` calls, RTK Query automatically fetches data from our Express API, caches it, and provides `isLoading` and `error` states to our React components.
    *   **Local State (`cartSlice.js` & `authSlice.js`):** We store the user's Shopping Cart and Authentication token in Redux, and sync them to the browser's `localStorage` so the user doesn't lose their session or cart items when they refresh the page.
*   **Routing (React Router):** `App.jsx` uses `react-router-dom` to map different URLs to different Screen components (e.g., `/cart` loads `CartScreen.jsx`) without ever refreshing the browser page.
*   **Styling (`index.css`):** The application uses a custom, premium Vanilla CSS design system leveraging CSS variables for a consistent dark-mode aesthetic, hover micro-animations, and responsive CSS Grid/Flexbox layouts.

## The Data Flow: How It All Connects

Here is an example of the step-by-step flow when a user visits the Home Page:

1. **User Visits `/`:** React Router detects the root URL and renders `HomeScreen.jsx`.
2. **Component Mounts:** `HomeScreen` calls the `useGetProductsQuery()` hook provided by RTK Query.
3. **Frontend Requests Data:** RTK Query sends an HTTP GET request to the backend at `http://localhost:5000/api/products`.
4. **Backend Processes Request:** Express routes the request to `getProducts` inside `productController.js`.
5. **Database Query:** The controller queries MongoDB (via Mongoose) to fetch the products.
6. **Backend Responds:** Express sends the product array back to the frontend as JSON.
7. **Frontend Renders:** RTK Query updates its state (`isLoading` becomes `false`, `data` is populated). `HomeScreen` detects the state change, loops through the products array, and renders the stunning product cards on your screen.

## How to Run the Project

You need two terminal windows to run this full-stack application simultaneously:

**Terminal 1: Run the Backend**
```bash
cd server
npm run dev # or: node server.js
```
*(Runs on http://localhost:5000)*

**Terminal 2: Run the Frontend**
```bash
cd client
npm run dev
```
*(Runs on http://localhost:5173)*
