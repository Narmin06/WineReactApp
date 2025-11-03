import { useState } from "react";
import Slider from "../components/slider/slider";
import List from "../wine-components/list/list";
import WineSommelier from "../wine-components/wine-sommelier/wine-sommelier";
import AboutSommelier from "../components/sommelier-section/aboutSommelier";

export default function Wine() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
    <Slider />
    <List searchTerm={searchTerm} />
    <WineSommelier/>
    <AboutSommelier />
    </>
  );
}
