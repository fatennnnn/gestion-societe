import { VscAccount } from "react-icons/vsc";
import { IconContext } from "react-icons";
import "./Contact.css";
const Contact = () => {
  return (
    <div>
      <h2 className="title-contact">Nous contacter</h2>
      <div>
        <h2 className="title">Paris</h2>
        <div className="contact">
          <IconContext.Provider value={{ className: "menu-icon" }}>
            <div>
              <VscAccount />
            </div>
          </IconContext.Provider>
          <h4 className="telephone">(+33) 01.69.44.94.89</h4>
          <a className="email" href="mailto:contact@justcrok.uk">
            contact@justcrok.uk
          </a>
        </div>
      </div>
      <div>
        <h2 className="title">Londre</h2>
        <div className="contact">
          <IconContext.Provider value={{ className: "menu-icon" }}>
            <div>
              <VscAccount />
            </div>
          </IconContext.Provider>
          <h4 className="telephone">(+33) 01.69.44.94.89</h4>
          <a className="email" href="mailto:contact@justcrok.uk">
            contact@justcrok.uk
          </a>
        </div>
      </div>
    </div>
  );
};
export default Contact;
