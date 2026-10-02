import Navbar from "./Layout/Navbar"
import Home from "./Pages/Home"
import About from "./Pages/About"
import AuthorAutonomy from "./Pages/AuthorAutonomy"
import CTASection from "./Pages/CTASection"
import Footer from "./Layout/Footer"
import LiteraryLifecycle from "./Pages/LiteraryLifecycle"

const App = () => {
  return (
    <>
    <Navbar/>
    <Home   />
    <About/>
    <LiteraryLifecycle/>
    <AuthorAutonomy/>
    <CTASection/>
   <Footer/>
    </>
  )
}

export default App
