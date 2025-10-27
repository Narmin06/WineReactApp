import Slider from "../components/slider/slider";
import FeaturesSection from "../components/features-section/featuresSection";
import ProductList from "../components/products/List/productList";
import SommelierSection from "../components/sommelier-section/sommelierSection";
import AboutSommelier from "../components/sommelier-section/aboutSommelier";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { searchTerm } = useOutletContext();

  return (
    <>
      <Slider />
      <FeaturesSection />
      <ProductList searchTerm={searchTerm} />
      <SommelierSection />
      <AboutSommelier />
    </>
  );
}
