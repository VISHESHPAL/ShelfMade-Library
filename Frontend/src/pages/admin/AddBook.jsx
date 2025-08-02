import React, { useState } from "react";
import { toast } from "react-toastify";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    totalCopies: 1,
    description: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleAddBook = (e) => {
    e.preventDefault();

    // You can integrate backend call here
    toast.success("📖 Book added successfully!");
    setBook({ title: "", author: "", totalCopies: 1, description: "" });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-[#2c3e50]">➕ Add New Book</h2>
      <form onSubmit={handleAddBook} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="📖 Book Title"
          value={book.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="👤 Author"
          value={book.author}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3"
          required
        />
        <input
          type="number"
          name="totalCopies"
          placeholder="📦 Total Copies"
          value={book.totalCopies}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3"
          min="1"
          required
        />
        <textarea
          name="description"
          placeholder="📝 Book Description"
          value={book.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3"
          rows="4"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-[#2c3e50] text-white py-2 px-6 rounded-md hover:bg-[#1e2f3a] transition-all"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
