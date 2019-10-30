import React from "react";

const Header = props => {
  return (
    <header className="App-header">
      <a href="/">
        <h2>{props.text}</h2>
      </a>
    </header>
  );
};

export default Header;
