import "./productCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="img">
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className="title">{product.name}</div>
      <div className="meta">
        {product.year} / {product.volume} L • {product.country}
      </div>

      <div className="price-row">
       <div className="price">{product.price ? product.price.toLocaleString("en-US") + "$" : "—"}</div>
        <button className="to-cart">ADD TO CART</button>
      </div>
    </div>
  );
}
