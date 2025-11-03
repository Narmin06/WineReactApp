import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products";
import "./productInfo.css";

export default function ProductInfo() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const [quantity, setQuantity] = useState(1); 
  const [totalPrice, setTotalPrice] = useState(product ? product.price : 0); 

  const containerRef = useRef(null);
  const leftRef = useRef(null);

  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [quantity, product]);

  useEffect(() => {
    const container = containerRef.current;
    const left = leftRef.current;
    if (!container || !left) return;

    const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;
    const EASE = 0.08;
    let startY = 0,
      maxTranslate = 0,
      raf;
    const current = { y: 0 },
      target = { y: 0 };

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    const measure = () => {
      const info = container.querySelector(".product-info");
      const containerTop = container.offsetTop - navbarHeight;
      const leftH = left.offsetHeight;
      const infoBottom = info.offsetTop + info.scrollHeight;
      const leftBottom = left.offsetTop + leftH;

      startY = containerTop;
      maxTranslate = Math.max(infoBottom - leftBottom, 0);
      updateTarget();
    };

    const updateTarget = () => {
      const scrollY = window.scrollY;
      target.y = clamp(scrollY - startY, 0, maxTranslate);
    };

    const animate = () => {
      current.y += (target.y - current.y) * EASE;
      left.style.transform = `translateY(${current.y.toFixed(2)}px)`;
      raf = requestAnimationFrame(animate);
    };

    measure();
    animate();
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", measure);
    left.querySelector("img")?.addEventListener("load", measure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", measure);
    };
  }, []);

  if (!product)
    return <h2 style={{ color: "white", padding: "100px" }}>Product not found.</h2>;

  return (
    <div className="product-details" ref={containerRef}>
      <div className="product-left" ref={leftRef}>
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <div className="product-meta">{product.country}</div>

        <div className="product-price">{totalPrice.toLocaleString("ru-RU")} Р</div>

        <div className="buy-row">
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button className="buy-btn">ADD TO CART</button>
        </div>

        <div className="product-stats">
          <div><strong>GEOGRAPHY:</strong> {product.region}</div>
          <div><strong>CLASSIFICATION:</strong> {product.classification}</div>
          <div><strong>FORTRESS:</strong> {product.strength}</div>
          <div><strong>SUGAR:</strong> {product.sugar}</div>
          <div><strong>IMPORTER:</strong> {product.importer}</div>
          <div><strong>RATING:</strong> {product.rating}</div>
          <div><strong>VARIETAL COMPOSITION:</strong> {product.composition}</div>
        </div>

        <div className="product-section">
          <h3>COLOR, TASTE, AROMA</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-section">
          <h3>LEGEND</h3>
          <p>{product.legend}</p>
        </div>
        <div className="product-section">
          <h3>VINIFICATION</h3>
          <p>{product.vinification}</p>
        </div>
      </div>
    </div>
  );
}