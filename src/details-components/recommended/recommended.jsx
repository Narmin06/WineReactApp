import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import products from "../../data/products";
import "./recommended.css";

export default function Recommended() {
  const { category } = useParams();
  const navigate = useNavigate();

  // Hər kateqoriyaya görə məhsulları filtrləyirik
  const recommendedProducts = products
    .filter((p) => p.category === category)
    .slice(0, 9); // 9 dənə məhsul (3×3 slayd üçün)

  const handleViewAll = () => {
    navigate(`/${category}`);
  };

  return (
    <div className="recommended-section">
      <h2 className="recommended-title">Вам также понравится...</h2>

      {/* Slider konteyner */}
      <div className="slider-container">
        <div className="slider-track">
          {recommendedProducts.map((p) => (
            <div key={p.id} className="recommended-card" onClick={() => navigate(`/${category}/${p.id}`)}>
              <div className="image-wrapper">
                <img src={p.imageUrl} alt={p.name} />
              </div>
              <h3 className="rec-name">{p.name}</h3>
              <p className="rec-meta">{p.country}</p>
              <div className="rec-price">{p.price.toLocaleString("ru-RU")} Р</div>
              <button className="rec-btn">В КОРЗИНУ</button>
            </div>
          ))}
        </div>
      </div>

      <button className="view-all-btn" onClick={handleViewAll}>
        Смотреть все
      </button>
    </div>
  );
}
