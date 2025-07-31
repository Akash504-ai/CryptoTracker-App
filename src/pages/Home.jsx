import React from 'react';
import "./style.css"
import Header from "../components/Common/Header";
import MainComponent from "../components/LandingPage/MainComponent";
import SharePopup from "../components/Share/SharePopup"
import Footer from '../components/Common/Footer';

const Home = () => {
  return (
    <div className='app-wrapper'>
      <Header />
      <main>
        <MainComponent />
      </main>
      {/* <SharePopup /> */}
      <Footer />
    </div>
  );
};

export default Home;
