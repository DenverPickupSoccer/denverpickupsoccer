import React, { useState } from 'react';
import Logo from 'logo.png';
import classNames from 'classnames';
import {useUserProvider} from 'contexts/UserProvider';

const DashboardNavbar = ({ setShowAddPickupModal }) => {
  const [expandBurgerMenu, setExpandBurgerMenu] = useState(false)
  const { signOut } = useUserProvider()

  return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-brand">
            <a className="navbar-item" href="/#">
              <img src={Logo}
                   alt="logo" width="150"
                   height="30" />
            </a>
          </div>
          <button
              className={
                classNames("navbar-burger", { 'is-active': expandBurgerMenu })
              }
              aria-label="menu"
              aria-expanded="false"
              data-target="dashboard-navbar"
              onClick={() => setExpandBurgerMenu(!expandBurgerMenu)}
          >
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
          </button>
        </div>

        <div
            id="dashboard-navbar"
            className={
              classNames("navbar-menu", { 'is-active': expandBurgerMenu })
            }
        >
          <div className="navbar-start"/>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-primary" onClick={() => setShowAddPickupModal(true)}>
                  <strong>Add Pickup</strong>
                </button>
                <button className="button is-light" onClick={signOut}>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default DashboardNavbar;
