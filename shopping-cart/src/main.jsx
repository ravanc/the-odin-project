import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Home from "./routes/Home.jsx";
import Shop from "./routes/Shop.jsx";
import Cart from "./routes/Cart.jsx";
import Item from "./routes/Item.jsx";
import productsLoader from "./lib/products.js";
import productLoader from "./lib/product.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
        loader: productsLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/item/:id",
        element: <Item />,
        loader: async ({ params }) => {
          const item = await productLoader(params.id);
          return item;
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
