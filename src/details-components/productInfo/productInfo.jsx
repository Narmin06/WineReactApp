import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products";
import "./productInfo.css";

export default function ProductInfo() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const leftRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!leftRef.current || !detailsRef.current) return;

      const rect = detailsRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Görünən hissə üzrə scroll irəliləyiş (yalnız bu div üçün)
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0),
        1
      );

      const containerHeight = rect.height;
      const imageHeight = leftRef.current.clientHeight;

      // şəkil divin içində yuxarıdan aşağıya tam hərəkət etsin
      const maxTranslate = containerHeight - imageHeight;

      // başlanğıcda yuxarıya sıx (boşluq yox)
      const startOffset = -1000; // yuxarıya çəkirik
      const translateY = startOffset + progress * (maxTranslate - startOffset);

      leftRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product)
    return (
      <h2 style={{ color: "white", padding: "100px" }}>Product not found.</h2>
    );

  return (
    <div className="product-details" ref={detailsRef}>
      <div className="product-left" ref={leftRef}>
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <div className="product-meta">{product.country}</div>

        <div className="product-price">
          {product.price.toLocaleString("ru-RU")} Р
        </div>

        <div className="buy-row">
          <input type="number" defaultValue={1} min={1} />
          <button className="buy-btn">В КОРЗИНУ</button>
        </div>

        <div className="product-stats">
          <div><strong>ГЕОГРАФИЯ:</strong> {product.region}</div>
          <div><strong>КЛАССИФИКАЦИЯ:</strong> {product.classification}</div>
          <div><strong>КРЕПОСТЬ:</strong> {product.strength}</div>
          <div><strong>САХАР:</strong> {product.sugar}</div>
          <div><strong>ИМПОРТЕР:</strong> {product.importer}</div>
          <div><strong>РЕЙТИНГ:</strong> {product.rating}</div>
          <div><strong>СОРТОВОЙ СОСТАВ:</strong> {product.composition}</div>
        </div>

        <div className="product-section">
          <h3>ЦВЕТ, ВКУС, АРОМАТ</h3>
          <p>{product.description}</p>
        </div>

        <div className="product-section">
          <h3>ЛЕГЕНДА</h3>
          <p>{product.legend}</p>
        </div>

        <div className="product-section">
          <h3>ВИНИФИКАЦИЯ</h3>
          <p>{product.vinification}</p>
        </div>
      </div>
    </div>
  );
}
