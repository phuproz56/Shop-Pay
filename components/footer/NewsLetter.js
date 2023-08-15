import Link from 'next/link';
import styles from './styles.module.scss';

export default function NewsLetter() {
  return (
    <div className={styles.footer__newsletter}>
        <h3>SIGN UP FOR OUR NEWSLETTER </h3>
        <div className={styles.footer__flex}>
            <input type="text" placeholder='Your Email Address'></input>
            <button className={styles.btn_primary}> SUBCRIBE</button>
        </div>
        <p>
            By clicking the SUBCRIBE button, you are agreeing to {" "}
            <Link href="">ourPrivacy & Cookie Policy</Link>
        </p>
    </div>
  )
}
