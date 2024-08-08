import React from "react";
import "./Home.css";
import HomeSection1 from "./HomeSection1/HomeSection1";
import HomeSectionProject from "./HomeSectionProject/HomeSectionProject";
import HomeSection2 from "./HomeSection2/HomeSection2";
import HomeSection3 from "./HomeSection3/HomeSection3";

function Home() {
  

  return (
    <div className="box">
      <HomeSection1/>
      <HomeSectionProject/>
      <HomeSection2/>
      <HomeSection3/>
    </div>
  );
}

export default Home;
