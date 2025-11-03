import React, { useMemo, useState, useEffect } from "react"; // 💡 useEffect əlavə olundu
import ProductFilters from "../Filter/productFilters";
import ProductCard from "../Card/productCard";
import ProductSort from "../Sort/productSort";
import Pagination from "../Pagination/pagination";
import products from "../../../data/products";
 
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
            <ProductCard key={p.id} product={p} category="wine" /> 
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