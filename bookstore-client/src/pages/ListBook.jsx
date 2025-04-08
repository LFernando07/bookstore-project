import { useEffect, useState } from "react";
import { Book } from "../coomponents/Books/Book.jsx";
import { getBooks } from "../services/api";
import "../styles/listBooks.css";

function ListOfBooks({ books }) {
  return (
    <div className="book-container">
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
}

function NoGetBooks() {
  return <p className="no-books-message">No se encontraron libros disponibles para mostrar</p>;
}

export function BooksContainer() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamar a la API para obtener los libros
    getBooks()
      .then((response) => {
        // Transformar los datos para que `BIN_TO_UUID(id)` se convierta en `id`
        const booksData = response.data.map((book) => ({
          id: book["BIN_TO_UUID(id)"], // Renombrar la clave
          ...book,
        }));

        setBooks(booksData); // Guardar los libros transformados en el estado
      })
      .catch((error) => {
        console.error("Error al obtener los libros:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) { //Mostrar en lo que se realiza el fetching de datos
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando libros...</p>
      </div>
    );
  }
  if (!Array.isArray(books) || books.length === 0) { // Mensaje por si no hay libros
    return <NoGetBooks />;
  }

  return <ListOfBooks books={books} />; // Mostrar la lista de libros
}