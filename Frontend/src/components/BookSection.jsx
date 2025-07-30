import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const dummyBooks = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    totalCopies: 10,
    availableCopies: 4,
    description: "A philosophical story about a shepherd’s journey to discover his destiny.",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    totalCopies: 7,
    availableCopies: 2,
    description: "A dystopian novel about totalitarianism and surveillance.",
  },
  {
    id: 3,
    title: "Wings of Fire",
    author: "A.P.J Abdul Kalam",
    totalCopies: 12,
    availableCopies: 7,
    description: "An inspiring autobiography of India’s Missile Man and President.",
  },
  {
    id: 4,
    title: "Harry Potter",
    author: "J.K. Rowling",
    totalCopies: 15,
    availableCopies: 9,
    description: "A magical story of a young wizard and his adventures.",
  },
  {
    id: 5,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    totalCopies: 10,
    availableCopies: 5,
    description: "A financial education book about building wealth.",
  },
];

const AvailableBooks = () => {
  const [expandedBookId, setExpandedBookId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const {user} = useAuthContext();

  const booksToDisplay = showAll ? dummyBooks : dummyBooks.slice(0, 4);

  const toggleDescription = (id) => {
    setExpandedBookId(expandedBookId === id ? null : id);
  };

  const handleBorrow = (bookId) => {

    if (user) {
      // 👇 Borrow logic can be added here (e.g., API call)
      toast.success(`📚 Book with ID ${bookId} has been borrowed successfully!`);
    } else {
      // 🔒 Not logged in — redirect to login
      toast.error("🔐 Please login to borrow books!");
      navigate("/login");
    }
  };

  return (
    <section className="bg-[#f7f9f4] px-6 md:px-20 py-16" id="books">
      <h2 className="text-3xl font-extrabold text-center text-[#3e3e3e] mb-12">
        📚 Available Books
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {booksToDisplay.map((book) => (
          <div
            key={book.id}
            className="bg-white p-6 rounded-xl shadow-md border border-[#e0e3d9]"
          >
            <h3 className="text-xl font-bold text-[#3e3e3e] mb-2">{book.title}</h3>
            <p className="text-[#5b5b5b] font-medium mb-1">👤 Author: {book.author}</p>
            <p className="text-[#5b5b5b] font-medium mb-1">📦 Total Copies: {book.totalCopies}</p>
            <p className="text-[#5b5b5b] font-medium mb-3">✅ Available: {book.availableCopies}</p>

            {expandedBookId === book.id && (
              <p className="text-sm text-[#4b4b4b] mb-3">{book.description}</p>
            )}

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => toggleDescription(book.id)}
                className="text-sm bg-[#bdc1b0] hover:bg-[#a8ae95] text-white px-4 py-2 rounded-full transition duration-300"
              >
                {expandedBookId === book.id ? "Hide Details" : "View Details"}
              </button>

              <button
                onClick={() => handleBorrow(book.id)}
                className="text-sm bg-[#3e3e3e] hover:bg-[#2f2f2f] text-white px-4 py-2 rounded-full transition duration-300"
              >
                Borrow
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {dummyBooks.length > 4 && (
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

export default AvailableBooks;
