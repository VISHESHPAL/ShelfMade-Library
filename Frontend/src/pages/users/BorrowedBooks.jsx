// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AuthContext } from "../../context/AuthContext";

// const BorrowedBooks = () => {
//   const { user } = useContext(AuthContext);
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBorrowedBooks = async () => {
//     try {
//       const { data } = await axios.get(`/api/borrowed/${user?._id}`);
//       setBooks(data.books);
//     } catch (error) {
//       toast.error("Failed to load borrowed books 📕");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchBorrowedBooks();
//     }
//   }, [user]);

//   if (!user) {
//     return (
//       <div className="text-center mt-20 text-gray-600 text-lg">
//         Please login to view your borrowed books.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h2 className="text-3xl font-bold mb-8 text-[#2c3e50] text-center">
//         📚 Your Borrowed Books
//       </h2>

//       {loading ? (
//         <div className="text-center text-gray-600 text-lg">Loading...</div>
//       ) : books.length === 0 ? (
//         <div className="text-center text-gray-500 text-md">You haven't borrowed any books yet.</div>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//           {books.map((book) => (
//             <div
//               key={book._id}
//               className="bg-[#f4f6f1] border border-[#d1d5c8] rounded-xl shadow hover:shadow-lg transition-all p-6"
//             >
//               <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">{book.title}</h3>
//               <p className="text-sm text-gray-700 mb-1">Author: {book.author}</p>
//               <p className="text-sm text-gray-700 mb-1">Borrowed On: {new Date(book.borrowedDate).toLocaleDateString()}</p>
//               <p className="text-sm text-gray-700">Due Date: {new Date(book.dueDate).toLocaleDateString()}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BorrowedBooks;

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const dummyBooks = [
  {
    _id: "1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    borrowedDate: "2025-07-20T00:00:00.000Z",
    dueDate: "2025-08-05T00:00:00.000Z",
  },
  {
    _id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    borrowedDate: "2025-07-15T00:00:00.000Z",
    dueDate: "2025-07-30T00:00:00.000Z",
  },
  {
    _id: "3",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    borrowedDate: "2025-07-10T00:00:00.000Z",
    dueDate: "2025-07-25T00:00:00.000Z",
  },
];

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setBooks(dummyBooks);
        setLoading(false);
      }, 800);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh] bg-[#f4f6f1]">
        <p className="text-lg text-[#2c3e50] font-medium">Please login to view your borrowed books.</p>
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
          <div className="text-center text-gray-500 text-md">You haven't borrowed any books yet.</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-md border border-[#d1d5c8] p-6 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-[#2c3e50] mb-3">{book.title}</h3>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Author:</span> {book.author}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Borrowed On:</span>{" "}
                  {new Date(book.borrowedDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Due Date:</span>{" "}
                  {new Date(book.dueDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;
