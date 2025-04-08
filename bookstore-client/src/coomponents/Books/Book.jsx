import '../../styles/book.css';

export const Book = ({ book }) => {
  return (
    <div className="card">
      <img src={book.imageUrl} className="card-img-top" alt={`imagen de: ${book.title}`} />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{book.author}</li>
        <li className="list-group-item">{book.price}</li>
        <li className="list-group-item">{book.stock}</li>
      </ul>
      <div className="card-body">
        <a href="#" className="card-link">Agregar a carrito</a>
        <a href="#" className="card-link">Comprar</a>
      </div>
    </div>
  );
}


