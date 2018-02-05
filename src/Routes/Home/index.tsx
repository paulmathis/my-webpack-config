import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      This is the home
      <Link to="/admin">Click Me</Link>
    </div>
  );
};

export default Home;
