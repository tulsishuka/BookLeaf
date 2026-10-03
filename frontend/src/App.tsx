

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
import Dashboard from "./components/author/Dashboard";
import MyBook from "./components/author/MyBook";
import BookDetail from "./components/author/BookDetail";
import SubmitQuery from "./components/author/SubmitQuery";
import MyTickets from "./components/author/MyTickets";
import AuthorProfile from "./components/author/AuthorProfile";
import BooksCatalog from "./components/admin/BooksCatalog";
import TicketQueue from "./components/admin/TicketQueue";

import AdminLayout from "./Layout/AdminLayout";

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

      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<Login />} />



      <Route path="/author" element={<AuthorLayout />}>

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="books"
          element={<MyBook />}
        />

        <Route
          path="books/:bookId"
          element={<BookDetail />}
        />

        <Route
          path="submit-query"
          element={<SubmitQuery />}
        />

        <Route
          path="tickets"
          element={<MyTickets />}
        />

        

        <Route
          path="account"
          element={<AuthorProfile />}
        />

      </Route>
<Route path="/admin" element={<AdminLayout />}>

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="books"
          element={<BooksCatalog />}
        />

      

        <Route
          path="tickets"
          element={<TicketQueue />}
        />

        

        

      </Route>

     

    </Routes>
  );
};

export default App;