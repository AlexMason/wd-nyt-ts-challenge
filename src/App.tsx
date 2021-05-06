import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import Nyt from "./components/Nyt";

function App() {
  return (
    <Container>
      <Nyt />
    </Container>
  );
}

export default App;
