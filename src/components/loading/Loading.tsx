// src/components/Loading.js
import React from "react";
import catType from "../../asset/cat-type.gif"; // Adjust the path as necessary
import "./Loading.css"; // Add CSS for loading styles

function Loading() {
  return (
    <div className="loading-overlay">
      <img src={catType} alt="Loading..." />
    </div>
  );
}

export default Loading;