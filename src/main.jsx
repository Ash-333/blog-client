import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import BlogPreview from "./pages/BlogPreview.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import { Provider } from "react-redux";
import store from "./store/app.js";
import PrivateRoute from "./components/PrivateRoute.jsx";
import EditBlog from "./pages/EditBlog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-posts",
        element: (
          <PrivateRoute>
            <AllPosts />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-post",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/review-post",
        element: (
          <PrivateRoute>
            <BlogPreview />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: <BlogDetail />,
      },
      {
        path: "/edit/:id",
        element: (
          <PrivateRoute>
            <EditBlog />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
