import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Dinner from "./pages/Dinner";
import Breakfast from "./pages/Breakfast";
import Lunch from "./pages/Lunch";
import Other from "./pages/Other";
import AppBarTop from "./components/AppBarTop";

const App = () => {
  return (
    <>
      <AppBarTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/details/:id" element={<Recipe />} />
        <Route path="/catergory/dinner" element={<Dinner />} />
        <Route path="/catergory/breakfast" element={<Breakfast />} />
        <Route path="/catergory/lunch" element={<Lunch />} />
        <Route path="/catergory/other" element={<Other />} />
      </Routes>
    </>
  );
};

export default App;
