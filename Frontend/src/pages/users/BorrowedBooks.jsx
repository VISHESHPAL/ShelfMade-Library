import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Borrowed Books from API
  const fetchBorrowedBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/my-books", {
        headers: {
          Authorization: `Bearer ${user?.token}`, // if your backend requires auth token
        },
      });
      // console.log(res.data)
      setBooks(res.data.books); // assumes your response has { books: [...] }
    } catch (err) {
      console.error("Error fetching books:", err);
      toast.error("Failed to load borrowed books.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Return Book
  const handleReturnBook = async (bookId) => {
    try {
      const res = await axios.patch(
        `/api/user/return/${bookId}`
      );
      toast.success(res.data.message || "Book returned successfully!");
      fetchBorrowedBooks(); // refresh list
    } catch (err) {
      console.error("Error returning book:", err);
      toast.error("Failed to return book.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchBorrowedBooks();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh] bg-[#f4f6f1]">
        <p className="text-lg text-[#2c3e50] font-medium">
          Please login to view your borrowed books.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#2c3e50] text-center mb-10">
          📚 Your Borrowed Books
        </h2>

        {loading ? (
          <div className="text-center text-[#2c3e50] text-lg">Loading...</div>
        ) : books.length === 0 ? (
          <div className="text-center text-gray-500 text-md">
            You haven't borrowed any books yet.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((item) => (
              <div
                key={item.book._id}
                className="bg-white rounded-xl shadow-md border border-[#d1d5c8] p-6 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-[#2c3e50] mb-3">
                  {item.book.title}
                </h3>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Author:</span> {item.book.author}
                </p>
                <p className="text-sm text-gray-700 mb-1"> 
                  <span className="font-medium">Borrowed On:</span>{" "}
                  {new Date(item.barrowedAt).toLocaleDateString("en-IN")}
                </p>


                <button
                  onClick={() => handleReturnBook(item.book._id)}
                  className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm transition-all duration-300"
                >
                  Return Book
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;
