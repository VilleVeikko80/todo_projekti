import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./screens/App";
import Authentication, { AuthenticationMode } from "./screens/Authentication";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProvider from "./context/UserProvider";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./screens/NotFound";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    errorElement: <NotFound />, // virhesivu tälle haaralle
    children: [
      { index: true, element: <App /> }, // "/" (index)
    ],
  },
  {
    path: "/signin",
    element: <Authentication authenticationMode={AuthenticationMode.SignIn} />,
    errorElement: <NotFound />,
  },
  {
    path: "/signup",
    element: <Authentication authenticationMode={AuthenticationMode.SignUp} />,
    errorElement: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
