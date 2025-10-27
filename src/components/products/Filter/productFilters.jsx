import React, { useEffect, useState } from "react";
import "./productFilters.css";

export default function ProductFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    color: "",
    sweetness: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleRadioToggle = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category] === value ? "" : value,
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyPriceFilter = () => {
    onFilterChange(filters);
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  return (
    <div className="filters">
      <div className="filter-block">
        <h3>Color</h3>
        <ul>
          {["White", "Red", "Pink", "Other"].map((color) => (
            <li key={color}>
              <label>
                <input
                  type="radio"
                  name="color"
                  checked={filters.color === color}
                  onClick={() => handleRadioToggle("color", color)}
                  readOnly
                />
                {color}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-block">
        <h3>Sweetness</h3>
        <ul>
          {["Dry", "Sweet", "Dessert", "Fortified"].map((sweetness) => (
            <li key={sweetness}>
              <label>
                <input
                  type="radio"
                  name="sweetness"
                  checked={filters.sweetness === sweetness}
                  onClick={() => handleRadioToggle("sweetness", sweetness)}
                  readOnly
                />
                {sweetness}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-block">
        <h3>Price</h3>
        <div className="price-filter">
          <input
            type="number"
            name="minPrice"
            placeholder="min"
            value={filters.minPrice}
            onChange={handlePriceChange}
            min ="0"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="max"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            min = "0"
          />
          <button className="price-ok" onClick={applyPriceFilter}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
