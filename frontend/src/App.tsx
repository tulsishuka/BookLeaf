
import { Routes, Route } from "react-router-dom";

import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";

import Home from "./Pages/Home";
import About from "./Pages/About";
import AuthorAutonomy from "./Pages/AuthorAutonomy";
import CTASection from "./Pages/CTASection";
import LiteraryLifecycle from "./Pages/LiteraryLifecycle";

import Login from "./components/Login";

import AuthorLayout from "./Layout/AuthorLayout";
import MyBook from "./components/author/MyBook";
import BookDetail from "./components/author/BookDetail";
import SubmitQuery from "./components/author/SubmitQuery";
import MyTickets from "./components/author/MyTickets";
import AuthorProfile from "./components/author/AuthorProfile";

import AdminLayout from "./Layout/AdminLayout";

import AdminDashboard from "./components/admin/AdminDashboard";
import AuthDashboard from "./components/author/AuthDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import TicketQueue from "./components/admin/TicketQueue";
import TicketDetail from "./components/admin/TicketDetail";
import AuthorTicketDetail from "./components/author/AuthorTicketDetail";


const HomePage = () => {
  return (
    <>
      <Navbar />

      <Home />
      <About />
      <LiteraryLifecycle />
      <AuthorAutonomy />
      <CTASection />

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<Login />} />


  <Route element={<ProtectedRoute allowedRole="author" />}>
  <Route path="/author" element={<AuthorLayout />}>
    <Route path="dashboard" element={<AuthDashboard />} />
    <Route path="books" element={<MyBook />} />
    <Route path="books/:bookId" element={<BookDetail />} />
    <Route path="submit-query" element={<SubmitQuery />} />
    <Route path="tickets" element={<MyTickets />} />
    <Route path="account" element={<AuthorProfile />} />
    <Route
      path="tickets/:id"
      element={<AuthorTicketDetail />}
    />
  </Route>
</Route>

<Route element={<ProtectedRoute allowedRole="admin" />}>
  <Route path="/admin" element={<AdminLayout />}>

    {/* Admin Dashboard */}
    <Route
      path="dashboard"
      element={<AdminDashboard />}
    />

    {/* ALL QUERIES */}
    <Route
      path="tickets"
      element={<TicketQueue />}
    />

    {/* SINGLE QUERY DETAIL */}
    <Route
      path="tickets/:id"
      element={<TicketDetail />}
    />
  </Route>
</Route>

    </Routes>
  );
};

export default App;