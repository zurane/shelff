import { PiPlusThin } from "react-icons/pi";
import { useEffect, useState } from "react";
import CreateBook from "../pages/CreateBook";
const Navigation = () => {
  const [books, setBooks] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBooks(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-3">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-md font-bold">My Recipes ({books.length})</h1>
        <span className="bg-gray-100 shadow-sm py-1 px-3 rounded">
          <button
            onClick={() => handleOpen()}
            className="flex flex-1 items-center gap-1 text-sm"
            to="/books/create"
          >
            <PiPlusThin />
            <span>Add a new recipe</span>
          </button>
        </span>
      </div>
      {<CreateBook openModal={openModal} handleClose={handleClose} />}
    </div>
  );
};

export default Navigation;
