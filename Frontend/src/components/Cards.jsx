import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";
import axios from "axios";
import toast from "react-hot-toast";

function Cards({ item }) {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/book/${id}`);
      fetchBooks();
      toast.success('Eliminado com Sucesso')
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);  
    setIsFormOpen(true);  
  };

  const handleSave = () => {
    setIsFormOpen(false);  
    fetchBooks();           
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="flex flex-col items-center card w-full md:w-72 bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white">
          <figure className="w-full h-48 overflow-hidden">
            <img
              src={`http://localhost:3000/uploads/${item.image}`}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="card-body p-4 w-full">
            <h2 className="card-title text-xl font-semibold mb-2 flex justify-between items-center">
              {item.name}
              <span className="badge badge-secondary px-3 py-1 rounded-full text-sm">
                {item.category}
              </span>
            </h2>

            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {item.title}
            </p>

            <div className="flex justify-between items-center mb-4">
              <div className="badge badge-outline font-semibold text-lg text-gray-800 dark:text-gray-200">
                ${item.price}
              </div>
              <div className=" cursor-pointer px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-700 transition-colors">
                Comprar agora
              </div>
            </div>

            <div className="space-x-2 flex justify-end">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <div className="mt-6 absolute top-0 w-[110%] h-full bg-white p-4 border-full">
          <BookForm
            bookData={selectedBook}
            onSave={handleSave}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      )}
    </>
  );
}

export default Cards;
