import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ id: "", title: "", author: "" });
  const [editingBook, setEditingBook] = useState(null);

  //const API_URL = "http://127.0.0.1:8000/books";
  const API_URL = "https://bookapi-2ta6.onrender.com/books";
  // Fetch all books
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Add a new book
  const addBook = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });
      if (response.ok) {
        await fetchBooks();
        setNewBook({ id: "", title: "", author: "" });
      } else {
        console.error("Failed to add book:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        await fetchBooks();
      } else {
        console.error("Failed to delete book:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Update a book
  const updateBook = async () => {
    if (!editingBook) return;

    try {
      const response = await fetch(`${API_URL}/${editingBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBook),
      });
      if (response.ok) {
        await fetchBooks();
        setEditingBook(null);
      } else {
        console.error("Failed to update book:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book Library</h1>

      {/* Add New Book */}
      <div>
        <h2>Add...... a New Book</h2>
        <input
          type="number"
          placeholder="ID"
          value={newBook.id}
          onChange={(e) => setNewBook({ ...newBook, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      {/* Book List */}
      <div>
        <h2>Book List</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author} (ID: {book.id})
              <button onClick={() => deleteBook(book.id)} style={{ marginLeft: "10px" }}>
                Delete
              </button>
              <button
                onClick={() => setEditingBook(book)}
                style={{ marginLeft: "10px" }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Book */}
      {editingBook && (
        <div>
          <h2>Edit Book</h2>
          <input
            type="text"
            placeholder="Title"
            value={editingBook.title}
            onChange={(e) =>
              setEditingBook({ ...editingBook, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Author"
            value={editingBook.author}
            onChange={(e) =>
              setEditingBook({ ...editingBook, author: e.target.value })
            }
          />
          <button onClick={updateBook}>Update Book</button>
          <button onClick={() => setEditingBook(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
