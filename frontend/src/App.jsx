import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import AppBarTop from "./components/AppBarTop";

const App = () => {
  return (
    <>
      <AppBarTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/details/:id" element={<Books />} />
      </Routes>
    </>
  );
};

export default App;
