import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Twitter from "./component/Twitter";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="container">
      <h3 style={{ textAlign: "center", marginTop: "60px" }}>
        Finding Twitter Mutual Friends of 2 Users
      </h3>
      <Twitter />
      <Footer />
    </div>
  );
}

export default App;
