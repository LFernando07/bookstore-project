import { useEffect, useState } from "react";
import Book from "../coomponents/Books/Book.jsx";
import { getBooks } from "../services/api";
import "../styles/listBooks.css";

function ListOfBooks({ books }) {
  if (!Array.isArray(books)) {
    return null; // Manejo de error si `books` no es un arreglo
  }

  return (
    <div className="book-container">
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
}

function NoGetBooks() {
  return <p className="no-books-message">
    No se encontraron libros disponibles para mostrar
  </p>;
}

export function BooksContainer() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks()
      .then((response) => {
        // Transformar los datos para que `BIN_TO_UUID(id)` se convierta en `id`
        const transformedBooks = response.data.map((book) => ({
          id: book["BIN_TO_UUID(id)"], // Renombrar la clave
          ...book, // Copiar el resto de las propiedades
        }));

        setBooks(transformedBooks); // Guardar los libros transformados en el estado
      })
      .catch((error) => {
        console.error("Error al obtener los libros:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando libros...</p>;
  }

  if (!Array.isArray(books) || books.length === 0) {
    return <NoGetBooks />;
  }

  return <ListOfBooks books={books} />;
}