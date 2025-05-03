import "./index.css"
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import Explore from "./Explore"
import AuthPage from "./AuthPage"

function App() {

  return (
    <>
    <Navbar/>
     <div className="max-w-screen-lg mx-auto bg-primary-200 h-screen">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
     </div>
    </>
  )
}

export default App
