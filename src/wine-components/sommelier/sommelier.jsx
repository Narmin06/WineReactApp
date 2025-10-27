import "./sommelier.css";
import sommelier from "../../assets/images/sommelier2.jpg";
import overlayShape from "../../assets/images/Vector 6.png";

export default function Sommelier() {
  return (
    <section className="sommelier-section">
      <div className="sommelier-container">
        <div className="sommelier-image">
          <img src={sommelier} alt="Sommelier" className="main-img" />
        </div>

        <div className="sommelier-overlay">
          <img src={overlayShape} alt="overlay" className="overlay-img" />
          <div className="sommelier-text">
            <h4>Sommelier Choice</h4>
            <h2>SPECIAL PRICES FOR CORPORATE CLIENTS</h2>
            <p>LEARN MORE</p>
          </div>
        </div>
      </div>
    </section>
  );
}
