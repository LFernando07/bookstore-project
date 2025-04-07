import '../styles/listBooks.css'
//Funciones para obtener los libros
import Book from "../coomponents/Books/Book"

function ListOfBooks({ books }) {
  return (
    <>
      {
        books.map(book => (Book({ key: book._id, book: book })
        ))
      }
    </>
  )
}

function NoGetBooks() {
  return (
    <p>No se encontraron libros disponibles para mostrar</p>

  )
}

export function Books({ books }) {
  const hasBooks = books?.length > 0

  return (
    hasBooks ? <ListOfBooks movies={books} /> : NoGetBooks()
  )
}