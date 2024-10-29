import React from "react";
import "./Home.css";
import HomeSection1 from "./HomeSection1/HomeSection1";
import HomeSectionProject from "./HomeSectionProject/HomeSectionProject";
import HomeSection2 from "./HomeSection2/HomeSection2";
import HomeSection3 from "./HomeSection3/HomeSection3";
import ContactBox from "./ContactBox/ContactBox";
import SkillCarousel from "../../components/skill-carousel/SkillCarousel";
import CVBox from "./CVBox/CVBox";

function Home() {
  return (
    <>
      <ContactBox/>
      <CVBox/>
      <div className="box">
        <HomeSection1/>
        <SkillCarousel/>
        <HomeSectionProject/>
        <HomeSection2/>
        <HomeSection3/>
      </div>
    </>
  );
}

export default Home;
