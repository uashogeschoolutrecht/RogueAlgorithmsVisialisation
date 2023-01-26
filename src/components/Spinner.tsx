import React from "react";
import "../styles/spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
      <p>The network graph is loading. This may take a while.</p>
    </div>
  );
}