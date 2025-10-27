import React, { useMemo, useState, useEffect } from "react"; // 💡 useEffect əlavə olundu
import ProductFilters from "../Filter/productFilters";
import ProductCard from "../Card/productCard";
import ProductSort from "../Sort/productSort";
import Pagination from "../Pagination/pagination";
import image from "../../../assets/images/wine.png";
import "./productList.css";

export default function ProductList({ searchTerm = "" }) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("name");
  const [filters, setFilters] = useState({});
  const [pageSize, setPageSize] = useState(9);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) setPageSize(8);
      else setPageSize(9);
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const products = [
    { id: 1, name: "L'ERMITE HERMITAGE", price: 90000, imageUrl: image, year: 2009 },
    { id: 2, name: "LE MEAL", price: 85000, imageUrl: image, year: 2008 },
    { id: 3, name: "LES GRIFFES", price: 95000, imageUrl: image, year: 2011 },
    { id: 4, name: "CROZES-HERMITAGE", price: 70000, imageUrl: image, year: 2012 },
    { id: 5, name: "ERMITAGE BLANC", price: 88000, imageUrl: image, year: 2010 },
    { id: 6, name: "CÔTE-RÔTIE", price: 120000, imageUrl: image, year: 2007 },
    { id: 7, name: "CONDRIEU", price: 86000, imageUrl: image, year: 2014 },
    { id: 8, name: "CHÂTEAUNEUF-DU-PAPE", price: 97000, imageUrl: image, year: 2015 },
    { id: 9, name: "HERMITAGE BLANC", price: 91000, imageUrl: image, year: 2013 },
    { id: 10, name: "SAINT-JOSEPH", price: 65000, imageUrl: image, year: 2016 },
  ];

  const searchedProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    return searchedProducts.filter((p) => {
      const byColor = !filters.color || p.color === filters.color;
      const bySweetness = !filters.sweetness || p.sweetness === filters.sweetness;
      const byPrice =
        (!filters.minPrice || p.price >= Number(filters.minPrice)) &&
        (!filters.maxPrice || p.price <= Number(filters.maxPrice));
      return byColor && bySweetness && byPrice;
    });
  }, [searchedProducts, filters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "newest") return b.year - a.year;
      return 0;
    });
  }, [filteredProducts, sort]);

  const totalPages = Math.ceil(sortedProducts.length / pageSize);
  const pagedProducts = sortedProducts.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="products-section">
      <div className="filters-wrapper">
        <ProductFilters onFilterChange={setFilters} />
      </div>

      <div className="products-content">
        <div className="sort-container">
          <ProductSort onSortChange={setSort} />
        </div>

        <div className="products-grid">
          {pagedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
          onPageSizeChange={setPageSize} 
        />
      </div>
    </div>
  );
}