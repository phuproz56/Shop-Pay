/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./styles.module.scss";
import {MdSecurity} from 'react-icons/md';
import {BsSuitHeart} from 'react-icons/bs';
import {RiAccountPinCircleLine, RiArrowDropDownFill} from 'react-icons/ri';
import { useState } from "react";
import UserMenu from "./UserMenu";


export default function Top({ country }) {
    const [loggedIn, setLoggedIn] = useState(true);
    const [visible, setvisible] = useState(false);
  return (
    <div className={styles.top}>
        <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
            <li className={styles.li}>
                <img 
                src={country.flag}
                // src="https://i.ytimg.com/vi/rG3aZznMIm8/maxresdefault.jpg"
                // src="https://png.pngtree.com/png-clipart/20200424/ourlarge/pngtree-round-creative-ink-brush-brush-vietnam-flag-png-image_2192072.jpg" 
                alt="" />
                <span> {country.name} / usd</span>
            </li>
            <li className={styles.li}>
                <MdSecurity/>
                <span>Buyer Protection</span>           
            </li>
            <li className={styles.li}>
                <span>Customer Service</span>
            </li>
            <li className={styles.li}>
                <span>Help</span>
            </li>
            <li className={styles.li}>
                <BsSuitHeart />
                <Link href="/profile/wishlist">
                    <span>Wishlist</span>
                </Link>
            </li>
            <li  className={styles.li}
            onMouseOver={() => setvisible(true)}
            onMouseLeave={() => setvisible(false)}
            >
                {
                    loggedIn ? (
                        <li  className={styles.li}>
                    <div className={styles.flex}>
                        <img src="https://th.bing.com/th/id/R.c11b6f38dffc24a4508217513b0e50bd?rik=Pt%2bkITlukiMkWg&riu=http%3a%2f%2fwww.emmegi.co.uk%2fwp-content%2fuploads%2f2019%2f01%2fUser-Icon.jpg&ehk=zjS04fF4nxx%2bpkvRPsSezyic3Z7Yfu%2fuoT75KnbNv1Y%3d&risl=&pid=ImgRaw&r=0" alt=""></img>
                        <span>Phu</span>
                        <RiArrowDropDownFill />
                    </div>
                </li>
                    )
                    : (
                    <li  className={styles.li}>
                    <div className={styles.flex}>
                        <RiAccountPinCircleLine />
                        <span>Account</span>
                        <RiArrowDropDownFill />
                    </div>
                </li>
                )}
                {
                    visible && <UserMenu loggedIn={loggedIn}/>
                }
            </li>
        </ul>
        </div>
    </div>
  )
}
