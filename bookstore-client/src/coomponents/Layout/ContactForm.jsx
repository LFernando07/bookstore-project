import '../../styles/footer.css';

export const ContactForm = () => {
  return (
    <div className="contact">
      <h1>Contáctanos</h1>
      <div id='contact' className="contact-container">
        <div className="contact-info">
          <div className="info-contact">
            <i className="fas fa-usercircle icon"></i>
            <h2>Información de Contacto</h2>
            <p>
              <i className="fas fa-envelope"></i>
              lfbp5000@gmail.com
            </p>
            <p>
              <i className="fas fa-phone"></i>
              +52 (735) 233 0176
            </p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Envía tu Mensaje</h2>
          <form action="https://formspree.io/f/xnnpgqer" method="POST">
            <input type="text" name='name' placeholder="Nombres" required />
            <input type="email" name='email' placeholder="Correo Electronico" required />
            <textarea name="mensaje" id="" placeholder="Mensaje" required></textarea>
            <button type="submit">Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </div>
  );
};