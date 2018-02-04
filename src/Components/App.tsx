import React from 'react';
import styles from './base.scss';
// const styles = require('./base.scss');
import Test from './Test';

const App = () => {
  return (
    <div className={styles.testApp}>
      <Test />
    </div>
  );
};

export default App;
