import React from "react";
import FacebookLogo from '../fb_icon.svg';

const Footer = () => {
  return <footer className='footer level'>
      <div className='level-item has-text-centered'>
          <p data-testid="author_names">
              <strong>Made by </strong>
              <a href='https://linkedin.com/in/oludavid' target='_blank' rel="noopener noreferrer nofollow">
                  <span className='has-text-success'>Olu </span>
              </a>
  &
  <a href='https://linkedin.com/in/mnaparstek' target='_blank' rel="noopener noreferrer nofollow">
                  <span className='has-text-success'> Martin</span>
              </a>
          </p>
      </div>
      <div className='level-item has-text-centered'>
          <a href="https://www.facebook.com/groups/denverpickupsoccer/?__cft__[0]=AZV9jHuReRSAM-1Lkx50LDVO_vG2l3k4ietNdFSJGJEmQDOV6U3uSZRlmobsUQjOCaFj9_BjxbtXM1K734fDT5Us8DyZcjgJ1U3c17g8q2lIkvT2qyTjvW1K7Vx-ecMPk2kfttwQQiG3W_qYIRz7i_LXD5Lb9Z5pqWFbktUGjmA7o_2hCXHrYW3ThbmWv_IkOOA&amp;__tn__=-UC%2CP-R">
              For More Games Follow: Denver Pick-Up Soccer
              <img className="facebook_icon" src={FacebookLogo} alt='Facebook Icon' />
          </a>
          {/* <span className="icon"><i className="fab fa-facebook-square fa-lg"></i></span> */}
      </div>
  </footer>
}

export default Footer;
