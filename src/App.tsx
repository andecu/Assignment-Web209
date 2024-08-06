import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import HomePage from "./pages/HomePage";
import ListProductPage from "./pages/ListProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import CategoryContext from "./context/CategoryContext";
import ListCategory from "./pages/CategoryManager/ListCategory";
import AddCategory from "./pages/CategoryManager/AddCategory";
import EditCategory from "./pages/CategoryManager/EditCategory";
import ProductContext from "./context/ProductContext";
import ListProduct from "./pages/ProductManager/ListProduct";
import AddProduct from "./pages/ProductManager/AddProduct";
import EditProduct from "./pages/ProductManager/EditProduct";
import SearchProductsPage from "./pages/SearchProductsPage";
import SignInPage from "./pages/Auth/SignInPage";
import SignUpPage from "./pages/Auth/SignUpPage";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CartPage from "./pages/Cart/CartPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/category/:categoryId",
          element: <ListProductPage />,
        },
        {
          path: `/products/:id`,
          element: <ProductDetailPage />,
        },
        {
          path: "/search",
          element: <SearchProductsPage />,
        },
        {
          path: "/sign-in",
          element: <SignInPage />,
        },
        {
          path: "/sign-up",
          element: <SignUpPage />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },

      ],
    },

    // admin
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "categories",
          element: <CategoryContext />,
          children: [
            {
              path: "",
              element: <ListCategory />,
            },
            {
              path: "add",
              element: <AddCategory />,
            },
            {
              path: ":id/edit",
              element: <EditCategory />,
            },
          ],
        },
        {
          path: "products",
          element: <ProductContext />,
          children: [
            {
              path: "",
              element: <ListProduct />,
            },
            {
              path: "add",
              element: (
                <CategoryContext>
                  <AddProduct />
                </CategoryContext>
              ),
            },
            {
              path: ":id/edit",
              element: (
                <CategoryContext>
                  <EditProduct />
                </CategoryContext>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
