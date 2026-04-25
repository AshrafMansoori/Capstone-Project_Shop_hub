# store.js

This file configures the Redux store for the frontend React application.

## Purpose
- Centralizes application state management using Redux Toolkit.
- Integrates RTK Query for API data fetching and caching.
- Manages authentication and shopping cart state.

## Key Components
- **configureStore:** Sets up the Redux store with reducers and middleware.
- **Reducers:**
  - `apiSlice.reducer`: Handles API data and caching (RTK Query).
  - `cartSliceReducer`: Manages shopping cart state.
  - `authSliceReducer`: Manages user authentication state.
- **Middleware:**
  - Adds RTK Query middleware for automated API caching and invalidation.
- **devTools:**
  - Enables Redux DevTools for easier debugging during development.

## Usage
- Import this store into your main entry point (e.g., `main.jsx`).
- Wrap your app with `<Provider store={store}>` to provide state access to all components.

---

**Example:**
```js
import store from './store';
import { Provider } from 'react-redux';

<Provider store={store}>
  <App />
</Provider>
```

---

**Location:**
- `client/src/store.js`

**Related files:**
- `client/src/slices/apiSlice.js`
- `client/src/slices/cartSlice.js`
- `client/src/slices/authSlice.js`
