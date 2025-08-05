import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AvailableBooks = () => {
  const [books, setBooks] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("/api/book/all", {
        withCredentials: true,
      });
      if (res.data.success) {
        setBooks(res.data.books);
        setLoading(false);
      } else {
        toast.error("Failed to fetch books.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const handleBorrow = async (bookId) => {
    // console.log(bookId);
    try {
      const res = await axios.post(`/api/user/borrow/${bookId}`,
        { bookId },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Book borrowed successfully!");
        fetchBooks(); 
      } else {
        toast.error(res.data.message || "Borrow failed.");
      }
    } catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.message || "Something went wrong during borrowing."
      );
    }
  };

  if (loading) return <p className="text-center mt-8 text-lg">Loading books...</p>;

  return (
    <section className="bg-[#f8f9fa] min-h-screen py-12 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        📚 Available Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 transition hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
            <p className="text-gray-600 mt-1">👤 {book.author}</p>
            <p className="text-gray-600 mt-1">📦 Total Copies: {book.totalCopies}</p>
            <p className="text-gray-600 mt-1">✅ Available: {book.availableCopies}</p>

            {expanded === book._id && (
              <p className="text-sm text-gray-700 mt-4">{book.description}</p>
            )}

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleExpand(book._id)}
                className="bg-gray-700 text-white px-4 py-2 text-sm rounded hover:bg-gray-900"
              >
                {expanded === book._id ? "Hide Details" : "View Details"}
              </button>
              <button
                onClick={() => handleBorrow(book._id)}
                disabled={book.availableCopies === 0}
                className={`px-4 py-2 text-sm rounded text-white ${
                  book.availableCopies === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {book.availableCopies === 0 ? "Unavailable" : "Borrow"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvailableBooks;
