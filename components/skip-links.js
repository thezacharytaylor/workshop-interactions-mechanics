import React from 'react';

import './styles/skip-links.scss';

const SkipLinks = (props) => {
  return (
    <>
      <a href={props.target} className="screen-reader-only">
        {props.text}
      </a>
    </>
  );
};

export default SkipLinks;
