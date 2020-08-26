import * as React from 'react';

const Paper = require('../../src/assets/images/backgrounds/paper.png');

export interface Props {
  name: string;
  xpInPercentage: string;
}

export const ResumeSkill = (props: Props) => (
  <li className="mb-2">
    <div className="resume-skill-name">{props.name}</div>
    <div className="progress resume-progress" style={{ height: '0.6rem' }}>
      <div
        className="progress-bar"
        role="progressbar"
        style={{
          width: props.xpInPercentage,
          backgroundImage: `url(${Paper})`,
          backgroundColor: '#e9ecef',
        }}
      />
    </div>
  </li>
);
