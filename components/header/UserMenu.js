/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./styles.module.scss";


export default function UserMenu({ loggedIn }) {
  return (
    <div className={styles.menu}>
        <h4>Welcome to Shop-Pay !</h4>
        {loggedIn ? (
        <div className={styles.flex}>
            <img className={styles.menu__img} src="https://th.bing.com/th/id/R.c11b6f38dffc24a4508217513b0e50bd?rik=Pt%2bkITlukiMkWg&riu=http%3a%2f%2fwww.emmegi.co.uk%2fwp-content%2fuploads%2f2019%2f01%2fUser-Icon.jpg&ehk=zjS04fF4nxx%2bpkvRPsSezyic3Z7Yfu%2fuoT75KnbNv1Y%3d&risl=&pid=ImgRaw&r=0" alt="" />    
            
            <div className={styles.col}>
                <span>Welcome Back, </span>
                <h3>Phu</h3>
                <span>Sign out</span>
            </div>
        </div>
        ) : (
            <div className={styles.flex}>
                <button className={styles.btn_primary}>Register</button>
                <button className={styles.btn_outlined}>Login</button>

            </div>
        )}
        <ul>
            <li>
                <Link href="/profile">Account</Link>
            </li>
            <li>
                <Link href="/profile/orders">My Orders</Link>
            </li>
            <li>
                <Link href="/profile/messages">Message Center</Link>
            </li>
            <li>
                <Link href="profile/address">Address</Link>
            </li>
            <li>
                <Link href="/profile/wishlist">Wishlist</Link>
            </li>
        </ul>
    </div>
  )
}
