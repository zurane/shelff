import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import AppBarTop from "./components/AppBarTop";

const App = () => {
  return (
    <>
      <AppBarTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/details/:id" element={<Recipe />} />
      </Routes>
    </>
  );
};

export default App;
