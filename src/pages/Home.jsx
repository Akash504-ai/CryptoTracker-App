import React from 'react';
import Header from "../components/Common/Header";
import MainComponent from "../components/LandingPage/MainComponent";
import SharePopup from "../components/Share/SharePopup"

const Home = () => {
  return (
    <div>
      <Header />
      <MainComponent />
      {/* <SharePopup /> */}
    </div>
  );
};

export default Home;
