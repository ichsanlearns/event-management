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
import Event from "./pages/organizer/Event";
import Approval from "./pages/organizer/Approval";
import Report from "./pages/organizer/Report";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/event" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
        <Route path="/organizer" element={<Organizer />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Event />} />
          <Route path="/approval" element={<Approval />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
