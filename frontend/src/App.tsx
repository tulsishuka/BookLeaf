
import { Routes, Route } from "react-router-dom";

import Navbar from "./Layout/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AuthorAutonomy from "./Pages/AuthorAutonomy";
import CTASection from "./Pages/CTASection";
import Footer from "./Layout/Footer";
import LiteraryLifecycle from "./Pages/LiteraryLifecycle";
import Login from "./components/Login";


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

      

    </Routes>
  );
};

export default App;