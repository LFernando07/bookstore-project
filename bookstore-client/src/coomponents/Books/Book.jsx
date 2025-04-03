import '../../styles/book.css';

export default function Book({ book }) {
  return (
    <div class="card" style="width: 18rem;">
      <img src="book.imageUrl" class="card-img-top" alt={`imagen de: ${book.image}`} />
      <div class="card-body">
        <h5 class="card-title">book.title</h5>
        <p class="card-text">book.description</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">book.author</li>
        <li class="list-group-item">book.price</li>
        <li class="list-group-item">book.stock</li>
      </ul>
      <div class="card-body">
        <a href="#" class="card-link">Agregar a carrito</a>
        <a href="#" class="card-link">Comprar</a>
      </div>
    </div>
  );
}


