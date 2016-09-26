import React, { Component, PropTypes } from 'react';
import Todos from './Todos/Todos';


const App = ({ location }) => {
  return (
    <Todos location={location} />
  );
};

App.propTypes = {
};

export default App;
