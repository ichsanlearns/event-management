import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "./routes/Root";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import Dashboard from "./pages/organizer/Dashboard";
import Approval from "./pages/organizer/Approval";
import Report from "./pages/organizer/Report";
import EventOrganizer from "./pages/organizer/Event";
import Event from "./pages/Event";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import EditProfile from "./pages/EditProfile";

import { Toaster } from "react-hot-toast";
import MyTicket from "./pages/customer/MyTicket";
import AttendeePage from "./pages/organizer/Attendee";
import { AuthProvider } from "./context/AuthContext";
import MyProfile from "./pages/organizer/MyProfile";
import RootProfile from "./routes/RootProfile";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            {/* <Route path="profile" element={<Profile />} /> */}
            <Route path="event/:id" element={<Event />} />

            <Route path="payment/:id" element={<Payment />} />
            {/* <Route path="profile/organizer/:id" element={<OrgProfile />} /> */}
          </Route>
          <Route path="profile" element={<RootProfile />}>
            <Route index element={<MyProfile />} />
            <Route path="edit" element={<EditProfile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="events" element={<EventOrganizer />} />
            <Route path="attendees/:eventId" element={<AttendeePage />} />

            <Route path="approval" element={<Approval />} />
            <Route path="report" element={<Report />} />
            <Route path="myticket" element={<MyTicket />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
