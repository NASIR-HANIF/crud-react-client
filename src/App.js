import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import Register from "./components/Register.js";
import NoPage from "./components/NoPage.js";
import Edit from "./components/Edit.js";
import Details from "./components/Details.js";


import { Routes, BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <>
     
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/view/:id" element={<Details />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
     
    </>
  );
}

export default App;
