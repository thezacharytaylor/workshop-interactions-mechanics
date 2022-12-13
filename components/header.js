import React from 'react';
import './styles/header.scss';

import CampSpotsLogo from 'images/icons/camp-spots-logo.svg';
import MegaNav from './meganav/';
import SkipLinks from './skip-links';

const Header = () => {
  return (
    <header id="header">
      <div id="header-nav">
        <div id="header-logo">
          <a href="/" className="header-main-item">
            <span className="logo-img">
              <img src={CampSpotsLogo} alt="" />
            </span>
            <span className="logo-text">CampSpots</span>
          </a>
        </div>
        <SkipLinks target={'#main'} text="Skip to Content" />
        <MegaNav />
        <div id="header-login">
          <a href="#">Login</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
