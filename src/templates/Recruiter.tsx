import * as React from 'react';
import './CV.css';
const Lines = require('./../assets/images/backgrounds/lines.png');

export default () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="fas fa-5x fa-spinner fa-spin" style={{ color: 'Red', margin: 'auto 0' }} />
    </div>
  );
};
