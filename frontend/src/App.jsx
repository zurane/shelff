import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import EditBook from "./pages/EditBook";
import CreateBook from "./pages/CreateBook";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<Books />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
    </Routes>
  );
};

export default App;
