import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div>
      <div className="header-wrapper">
        <Link to="/">
          <div className="header-title">OUTPUT BLOG</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
