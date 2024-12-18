import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Dinner from "./pages/Dinner";
import Breakfast from "./pages/Breakfast";
import Lunch from "./pages/Lunch";
import Snacks from "./pages/Snacks";
import Dessert from "./pages/Dessert";
import AppBarTop from "./components/AppBarTop";

const App = () => {
  return (
    <>
      <AppBarTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/details/:id" element={<Recipe />} />
        <Route path="/category/dinner" element={<Dinner />} />
        <Route path="/category/breakfast" element={<Breakfast />} />
        <Route path="/category/snack" element={<Snacks />} />
        <Route path="/category/dessert" element={<Dessert />} />
        <Route path="/category/lunch" element={<Lunch />} />
      </Routes>
    </>
  );
};

export default App;
