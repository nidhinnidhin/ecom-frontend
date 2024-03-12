import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import styles from '@/styles/Footer.module.css';
import logo from "../static/images/removed-logo.png";
import Image from 'next/image';

const Footer = () => {
  return (
    <>
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>
        <Image src={logo} alt="image" width={100} height={50} className={styles.logo}/>
        </div>
        <div className={styles.footerSocialIcons}>
          <a href="https://www.facebook.com"><FaFacebook /></a>
          <a href="https://www.twitter.com"><FaTwitter /></a>
          <a href="https://www.instagram.com"><FaInstagram /></a>
        </div>
      </div>
      <div className={styles.footerCopyright}>
        <p className={styles.bottomText}>&copy; 2024 Click Shop. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
};

export default Footer;
