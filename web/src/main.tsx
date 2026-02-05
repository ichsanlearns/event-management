import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "./routes/Root";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Organizer from "./routes/Organizer";
import Dashboard from "./pages/organizer/Dashboard";
import Approval from "./pages/organizer/Approval";
import Report from "./pages/organizer/Report";
import Event from "./pages/Event";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import EditProfile from "./pages/EditProfile";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />

          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="event/:id" element={<Event />} />
          <Route path="payment" element={<Payment />} />
        </Route>
        <Route path="organizer" element={<Organizer />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<Event />} />
          <Route path="approval" element={<Approval />} />
          <Route path="report" element={<Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
