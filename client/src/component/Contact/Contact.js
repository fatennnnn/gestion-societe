import { IoMdContacts } from "react-icons/io";
import { MdContactPhone } from "react-icons/md";
import { MdContactMail } from "react-icons/md";
import { IconContext } from "react-icons";
import "./Contact.css";
const Contact = () => {
  return (
    <div className="contact-space">
      <div className="contact__header">
        <h2>Nous contacter</h2>
        <span className="text-line"></span>
        <form className="contact__form">
          <input type="text" placeholder="Nom" />
          <input type="text" placeholder="Email" />
          <textarea
            name="message"
            placeholder="Message"
            id=""
            cols="30"
            rows="5"
          ></textarea>
          <button className="contact__form__submit">envoyer</button>
        </form>
      </div>
      <div className="contact__cards">
        <div className="contact__card">
          <div className="contact__card__head">
            <h2 className="title">Paris</h2>
            <IconContext.Provider value={{ className: "menu-icon" }}>
              <div>
                <IoMdContacts />
              </div>
            </IconContext.Provider>
          </div>
          <div className="contact__card__info">
            <div className="contact__card__tel">
              <IconContext.Provider value={{ className: "info-icon" }}>
                <div>
                  <MdContactPhone />
                </div>
              </IconContext.Provider>
              <p>(+33) 01.69.44.94.89</p>
            </div>
            <div className="contact__card__email">
              <IconContext.Provider value={{ className: "info-icon" }}>
                <div>
                  <MdContactMail />
                </div>
              </IconContext.Provider>
              <a href="mailto:contact@justcrok.uk">contact@justcrok.uk</a>
            </div>
          </div>
        </div>

        <div className="contact__card">
          <div className="contact__card__head">
            <h2 className="title">Londre</h2>
            <IconContext.Provider value={{ className: "menu-icon" }}>
              <div>
                <IoMdContacts />
              </div>
            </IconContext.Provider>
          </div>
          <div className="contact__card__info">
            <div className="contact__card__tel">
              <IconContext.Provider value={{ className: "info-icon" }}>
                <div>
                  <MdContactPhone />
                </div>
              </IconContext.Provider>
              <p>(+33) 01.69.44.94.89</p>
            </div>
            <div className="contact__card__email">
              <IconContext.Provider value={{ className: "info-icon" }}>
                <div>
                  <MdContactMail />
                </div>
              </IconContext.Provider>
              <a href="mailto:contact@justcrok.uk">contact@justcrok.uk</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
