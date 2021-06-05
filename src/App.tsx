import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="main">
        <div className="item-wrapper"></div>
      </div>
      <Footer />
    </>
  );
};

export default App;
