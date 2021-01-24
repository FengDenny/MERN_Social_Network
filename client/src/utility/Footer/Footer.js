import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faGithub, faFacebook);

function Footer() {
  return (
    <div className='footer'>
      <div className='flex justify-evenly footer-content'>
        <h1 className=' footer-copyright primary-heading white-color sm'>
          © 2021 MSNwork. | All rights reserved.
        </h1>
        <div className='fa-icon'>
          <a href='https://github.com/FengDenny'>
            <FontAwesomeIcon className='fa-icon-github l' icon={faGithub} />
          </a>
          <a href='/'>
            <FontAwesomeIcon className='fa-icon-github l' icon={faFacebook} />
          </a>
        </div>
      </div>
    </div>
  );
}
export default Footer;
