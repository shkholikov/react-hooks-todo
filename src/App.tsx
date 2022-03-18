import * as React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import ToDo from "./components/ToDo";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/todo" element={<ToDo />} />
      </Routes>
    </div>
  );
}

export default App;
