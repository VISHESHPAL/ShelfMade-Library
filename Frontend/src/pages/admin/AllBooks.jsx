import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [expandedBookId, setExpandedBookId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/api/book/all");
        // console.log(res)
        if (res.data.success) {
          setBooks(res.data.books);
        } else {
          toast.error("Failed to fetch books");
        }
      } catch (error) {
        toast.error("❌ Error fetching books from server");
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  const booksToDisplay = showAll ? books : books.slice(0, 4);

  const toggleDescription = (id) => {
    setExpandedBookId(expandedBookId === id ? null : id);
  };

  return (
    <section className="bg-[#f7f9f4] px-6 md:px-20 py-16" id="books">
      <h2 className="text-3xl font-extrabold text-center text-[#3e3e3e] mb-12">
        📚 Available Books
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {booksToDisplay.map((book) => (
          <div
            key={book._id}
            className="bg-white p-6 rounded-xl shadow-md border border-[#e0e3d9]"
          >
            <h3 className="text-xl font-bold text-[#3e3e3e] mb-2">{book.title}</h3>
            <p className="text-[#5b5b5b] font-medium mb-1">👤 Author: {book.author}</p>
            <p className="text-[#5b5b5b] font-medium mb-1">📦 Total Copies: {book.totalCopies}</p>
            <p className="text-[#5b5b5b] font-medium mb-3">✅ Available: {book.availableCopies}</p>

            {expandedBookId === book._id && (
              <p className="text-sm text-[#4b4b4b] mb-3">{book.description}</p>
            )}

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => toggleDescription(book._id)}
                className="text-sm bg-[#bdc1b0] hover:bg-[#a8ae95] text-white px-4 py-2 rounded-full transition duration-300"
              >
                {expandedBookId === book._id ? "Hide Details" : "View Details"}
              </button>
              
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {books.length > 4 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-[#3e3e3e] text-white hover:bg-[#2f2f2f] px-6 py-3 rounded-full text-sm font-medium transition duration-300"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default AllBooks;
