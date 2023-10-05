import React from 'react';
import Logo from './logo-package-GOLD/png/logo-no-background.png';

export function SiteHeader() {

  return (

    <header className="border-bottom lh-1 py-3">
      <div className="main-header row flex-nowrap justify-content-between align-items-center text-center">
        <div className="col-3 pt-1">

        </div>
        <div className="logo-cont col-6 text-center">
          <a className="link-secondary" href="#">Subscribe</a>
          <img className='logo' src={Logo} alt='logo' />

        </div>
        <div className="col-3 d-flex justify-content-end pr-5">
          <a className="link-secondary-icon" href="#" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
          </a>
          <a className="btn btn-sm " href="#">Sign up</a>
        </div>
      </div>
    </header>
  );
}
