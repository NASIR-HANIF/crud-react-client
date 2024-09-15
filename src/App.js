import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbar from "./components/Navbar.js";
import NoPage from "./components/NoPage.js";
 import Edit from "./components/EditPage.js";
import Home from "./components/HomePage.js";
import Details from "./components/DetailsPage.js";
import Register from "./components/RegisterPage.js";
import { SearchProvider } from "./components/context/SearchContext.js";
import SearchResults from "./components/SearchResults.js"



import { Routes, BrowserRouter, Route } from "react-router-dom";

function App() {
  return (

    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/view/:id" element={<Details />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
