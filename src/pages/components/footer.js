import styles from "@/styles/Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "next/image";
import cardImage1 from "../../static/images/card1.png";
import cardImage2 from "../../static/images/card2.png";
import cardImage3 from "../../static/images/card3.png";
import cardImage4 from "../../static/images/card4.png";
import cardImage5 from "../../static/images/card5.png";

export default function Footer() {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.listWrapper}>
          {/* <img src=""/> */}
          <h1>Logo</h1>
          <p>lorem sbd sfdb sdfasbg asfbas fasfbas fjk</p>
          <div>
            <button className={styles.socialBtn}>
              <FacebookIcon />
            </button>
            <button className={styles.socialBtn}>
              <TwitterIcon />
            </button>
            <button className={styles.socialBtn}>
              <InstagramIcon />
            </button>
            <button className={styles.socialBtn}>
              <GitHubIcon />
            </button>
          </div>
        </div>
        <div className={styles.listWrapper}>
          <ul className={styles.list}>
            <h4 className={styles.listHeading}>MY ACCOUNT</h4>
            <li className={styles.listItem}>About Us</li>
            <li className={styles.listItem}>Condact Us</li>
            <li className={styles.listItem}>Terms & Conditions</li>
            <li className={styles.listItem}>Return & Exchange</li>
            <li className={styles.listItem}>Shipping & Delivery</li>
          </ul>
        </div>
        <div className={styles.listWrapper}>
          <ul className={styles.list}>
            <h4 className={styles.listHeading}>QUICK LINKS</h4>
            <li className={styles.listItem}>About Us</li>
            <li className={styles.listItem}>Condact Us</li>
            <li className={styles.listItem}>Terms & Conditions</li>
            <li className={styles.listItem}>Return & Exchange</li>
            <li className={styles.listItem}>Shipping & Delivery</li>
          </ul>
        </div>
        <div className={styles.listWrapper}>
          <ul className={styles.list}>
            <h4 className={styles.listHeading}>CONTACT US</h4>
            <li className={styles.listItem}>About Us</li>
            <li className={styles.listItem}>Condact Us</li>
            <li className={styles.listItem}>Terms & Conditions</li>
            <li className={styles.listItem}>Return & Exchange</li>
            <li className={styles.listItem}>Shipping & Delivery</li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div>
          <p>@2019-24 COPY RIGHT BY SHOPING CART</p>
        </div>
        <div className={styles.footerPayementImages}>
          <Image
            src={cardImage1}
            alt="cards"
            width={25}
            height={25}
          />
          <Image
            src={cardImage2}
            alt="cards"
            width={25}
            height={25}
          />
          <Image
            src={cardImage3}
            alt="cards"
            width={25}
            height={25}
          />
          <Image
            src={cardImage4}
            alt="cards"
            width={25}
            height={25}
          />
          <Image
            src={cardImage5}
            alt="cards"
            width={25}
            height={25}
          />
        </div>
      </div>
    </div>
  );
}
