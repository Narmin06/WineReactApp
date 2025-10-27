import { useState } from "react";
import Slider from "../wine-components/slider/wine-slider";
import List from "../wine-components/list/list";
import Sommelier from "../wine-components/sommelier/sommelier";
import AboutSommelier from "../components/sommelier-section/aboutSommelier";

export default function Wine() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
    <Slider />
    <List searchTerm={searchTerm} />
    <Sommelier/>
    <AboutSommelier />
    </>
  );
}
