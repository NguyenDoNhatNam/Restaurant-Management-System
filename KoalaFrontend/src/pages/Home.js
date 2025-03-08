import React from "react";
import Footer from "../components/Footer/Footer";
import About from "../components/About/About";
import Homepart from "../components/Intro/Homepart";
import Menu from "../components/Food/TrendingFood";
import Overview from "../components/Overview/Overview";
const Home = () => {
  return (
    <div>
      <div>
        <Homepart />
      </div>
      <div id="overview">
        <Overview />
      </div>
      <div id="menu">
        <Menu />
      </div>
      <div id="about">
        <About />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
