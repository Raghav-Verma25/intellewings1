import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Layout from "./Layout";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Completion from "./Components/Completion";
const Blog = lazy(() => import("./Components/Blog"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path="/blog"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Blog />
          </Suspense>
        }
      />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/complete" element={<Completion />} />
    </Route>,
  ),
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
