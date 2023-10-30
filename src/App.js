import React from "react";
import Login from "./Pages/Login";

import { Route, Routes } from "react-router-dom";
import Analytics from "./Pages/Analytics";
import DashBoard from "./component/Dashboard";
import Data from "./Pages/Data";
import Header from "./component/Header";
import Register from "./Pages/Register";

const App = () => {
  return (
    <>
    
        <Header/>
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Register/>} />
        <Route
          path="/analytics"
          element={<DashBoard children={<Analytics />} />}
        />

        <Route
          path="/data"
          element={<DashBoard children={<Data />} />}
        />
      </Routes>
    </>
  );
};

export default App;
