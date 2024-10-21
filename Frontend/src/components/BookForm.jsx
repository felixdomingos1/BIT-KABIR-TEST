import React, { useState, useEffect } from "react";
import axios from "axios";

function BookForm({ bookData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    title: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (bookData) {
      setFormData(bookData); 
    }
  }, [bookData]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("file", file); 
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("title", formData.title);

    try {
        
        if (bookData && bookData.id) { 
            await axios.put(`http://localhost:3000/book/${bookData.id}`, formData);
        } else { 
        await axios.post("http://localhost:3000/book", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setMessage("Livro salvo com sucesso!");
      onSave(); 
    } catch (error) {
      console.log(error);
      setMessage("Erro ao salvar o livro.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Book Name"
        value={formData.name}
        onChange={handleInputChange}
        className="w-full p-2 border"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleInputChange}
        className="w-full p-2 border"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleInputChange}
        className="w-full p-2 border"
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
        className="w-full p-2 border"
      />
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        className="w-full p-2 border"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
        {bookData ? "Update Book" : "Add Book"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Cancel
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default BookForm;
