# Capstone Project: Shop Hub

Live Demo: [https://capstone-project-shop-hub.onrender.com](https://capstone-project-shop-hub.onrender.com)

---
##OUTPUT
<img width="1826" height="913" alt="Screenshot 2026-04-25 181307" src="https://github.com/user-attachments/assets/bfce64ae-d0e7-434c-bebc-fb1e9f617673" />

#2
<img width="1785" height="875" alt="image" src="https://github.com/user-attachments/assets/b2a9728b-b4a0-452d-bca8-0719ec65191b" />
#3
<img width="1786" height="909" alt="image" src="https://github.com/user-attachments/assets/deac103d-9ee8-45b3-9634-d3a1e8fba175" />




## Overview
Shop Hub is a full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). It features user authentication, product management, shopping cart, order processing, and admin controls.

---

## Features
- User registration, login, and profile management
- Product listing, search, and details
- Shopping cart and checkout flow (shipping, payment, place order)
- Order history for users
- Admin dashboard for managing products and orders
- Responsive design with custom CSS
- Secure authentication with JWT
- RESTful API with error handling and middleware

---

## Live Demo
Visit: [https://capstone-project-shop-hub.onrender.com](https://capstone-project-shop-hub.onrender.com)

---

## Project Structure
- **client/**: React frontend (SPA)
- **server/**: Node.js/Express backend API

See below for a detailed breakdown of each folder and file.

---

## How to Run Locally
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd capstone
   ```
2. **Install dependencies:**
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in `server/` with your MongoDB URI and JWT secret.
4. **Run the backend:**
   ```bash
   cd server
   npm run dev
   # Runs on http://localhost:5000
   ```
5. **Run the frontend:**
   ```bash
   cd client
   npm run dev
   # Runs on http://localhost:5173
   ```

---

## Deployment
- The app is deployed on Render. The backend serves the frontend's static files in production.
- For your own deployment, use services like Render, Vercel, or Netlify for frontend, and MongoDB Atlas for the database.

---

## File & Folder Structure

### client/
- `src/` - React source code
  - `App.jsx` - Main app and routes
  - `components/` - Header, Footer, AdminRoute, etc.
  - `screens/` - Home, Product, Cart, Auth, Checkout, Profile, Admin screens
  - `slices/` - Redux Toolkit slices (API, auth, cart)
  - `store.js` - Redux store setup
  - `assets/` - Images and static assets
- `public/` - Static files and images

### server/
- `server.js` - Express app entry point
- `controllers/` - Business logic for products, users, orders
- `models/` - Mongoose schemas
- `routes/` - API endpoints
- `middleware/` - Auth and error handling
- `data/` - Seed data for products and users
- `utils/` - Helper functions (e.g., JWT generation)

---

## Technologies Used
- React, Redux Toolkit, RTK Query, React Router
- Node.js, Express.js
- MongoDB, Mongoose
- JWT for authentication
- Vite for frontend build

---

## License
This project is for educational purposes as a capstone demonstration.

---

## Credits
Developed by Ashraf. Inspired by modern e-commerce best practices.
