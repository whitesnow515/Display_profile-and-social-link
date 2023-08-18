import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Preview from "./Pages/Preview";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/preview/:id" element={<Preview />} />
      </Routes>
    </Router>
  );
};

export default App;
