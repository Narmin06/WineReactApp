import Slider from "../components/slider/slider";
import FeaturesSection from "../components/features-section/featuresSection";
import ProductList from "../components/products/List/productList";
import SommelierSection from "../components/sommelier-section/sommelierSection";
import AboutSommelier from "../components/sommelier-section/aboutSommelier";
import { useOutletContext } from "react-router-dom";
import products from "../data/products"; // 🔹 məhsul siyahısını gətiririk

export default function Home() {
  const { searchTerm } = useOutletContext();

  // 🔹 Yalnız "wine" kateqoriyasındakı məhsulları götürürük
  const wineProducts = products.filter((p) => p.category === "wine");

  return (
    <>
      <Slider />
      <FeaturesSection />
      {/* 🔹 ProductList-ə yalnız şərab məhsulları ötürürük */}
      <ProductList searchTerm={searchTerm} products={wineProducts} />
      <SommelierSection />
      <AboutSommelier />
    </>
  );
}
