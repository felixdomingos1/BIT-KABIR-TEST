import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import BookForm from "./BookForm";

function Course() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/book");
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  const handleAddNew = () => {
    setSelectedBook(null);  // Reseta o livro selecionado
    setIsFormOpen(true);    // Abre o formulário
  };

  const handleSave = () => {
    setIsFormOpen(false);  
    fetchBooks();           
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 items-center justify-center text-center">
        <h1 className="text-2xl md:text-4xl">
          Estamos Felizes em tê-lo{" "}
          <span className="text-pink-500">Aqui! :)</span>
        </h1>
        <p className="mt-12">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
          assumenda? Repellendus, iste corrupti? Tempore laudantium repellendus accusamus
          accusantium sed architecto odio, nisi expedita quas quidem nesciunt debitis dolore
          non aspernatur praesentium assumenda sint quibusdam, perspiciatis, explicabo sequi
          fugiat amet animi eos aut. Nobis quisquam reiciendis sunt quis sed magnam consequatur!
        </p>
        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
        </Link>
      </div>

      <button
        onClick={handleAddNew}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add New Book
      </button>

      {isFormOpen && (
        <div className="mt-6">
          <BookForm
            bookData={selectedBook}
            onSave={handleSave}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      )}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        {books.length > 0 ? (
          books.map((item) => (
            <div key={item.id} className="relative">
              <Cards item={item} />
            </div>
          ))
        ) : (
            <p className="w-[400%] bg-red-200 flex items-center justify-center">Nenhum livro disponível no momento.</p>
        )}
      </div>
    </div>
  );
}

export default Course;

