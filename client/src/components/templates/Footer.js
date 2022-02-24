import styles from "./Footer.module.css";
import { IoLogoFacebook } from "react-icons/io";
import { FaInstagramSquare } from "react-icons/fa";
import { TiSocialYoutubeCircular } from "react-icons/ti"

export const Footer = () => {
    return <>
        <div className={styles.footer}>
            <div>
                <h1>Help Centre</h1>
                <p>Using my account</p>
                <p>Ordering</p>
                <p>Shipping and delivery</p>
                <p>Returns</p>
                <p>Autoship</p>
            </div>
            <div>
                <h1>Pet Information</h1>
                <p>Blog</p>
                <p>Dog Breed information</p>
                <p>Cat Breed information</p>
                <p>Features</p>
            </div>
            <div>
                <h1>Company Info</h1>
                <p>About Us</p>
                <p>Contact Us</p>
                <p>Careers</p>
            </div>
            <div>
                <h1>Terms and Policies</h1>
                <p>Privacy policy</p>
                <p>Terms and Conditions</p>
                <p>Terms of use</p>
                <p>Membership Terms</p>
                <p>Sales Terms</p>
            </div>
            <div className={styles.icons}>
                <h1><IoLogoFacebook /></h1>
                <h1><FaInstagramSquare /></h1>
                <h1><TiSocialYoutubeCircular /></h1>
            </div>
        </div>
    </>
}