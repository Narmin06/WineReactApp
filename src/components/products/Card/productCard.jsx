import { Link } from "react-router-dom";
import "./productCard.css";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card"> {/* ✅ keçid */}
      <div className="img">
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className="title">{product.name}</div>
      <div className="meta">
        {product.year} / {product.volume || "0.75 L"} • {product.country || "ФРАНЦИЯ"}
      </div>

      <div className="price-row">
        <div className="price">
          {product.price ? product.price.toLocaleString("ru-RU") + " Р" : "—"}
        </div>
        <button className="to-cart">В КОРЗИНУ</button>
      </div>
    </Link>
  );
}
