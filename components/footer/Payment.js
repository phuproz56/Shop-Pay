/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss';

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
        <h3>CHẤP NHẬN THANH TOÁN VỚI</h3>
        <div className={styles.footer__flexwrap}>
            <img src="../../images/payment/mastercard.webp" alt=""></img>
            <img src="../../images/payment/visa.webp" alt=""></img>
            <img src="../../images/payment/paypal.webp" alt=""></img>
        </div>
    </div>
  )
}
