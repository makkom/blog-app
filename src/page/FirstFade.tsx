import React, { useState } from "react";
import "./FirstFade.css";

const FirstFade: React.FC = () => {
  const [fadeState, setFadeState] = useState(true);
  setTimeout(() => {
    setFadeState(false);
  }, 3000);
  return (
    <>
      <div
        className="fade-wrap"
        style={{
          transition: "1s",
          opacity: fadeState ? 1 : 0,
        }}
      >
        <div className="out">
          <h1 className="fade-title">Output Blog</h1>
          <p className="sub-title">Welcome to my Blog</p>
          <script type="text/javascript" src="app.js"></script>
        </div>
      </div>
    </>
  );
};

export default FirstFade;
