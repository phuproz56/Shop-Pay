/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./styles.module.scss";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Main() {
    const { cart } = useSelector((state) => ({...state}));
    // console.log(cart.length);
  return (
    <div className={styles.main}>
        <div className={styles.main__container}>
            <Link href='/' legacyBehavior>
            <a className={styles.logo}>
                <img src='../../images/vnshop1.jpg' alt='' />
            </a>
            </Link>
            <div className={styles.search}>
                <input type="text" placeholder="Nhập từ khóa ..." />
                <div className={styles.search__icon}>
                    <RiSearch2Line />
                </div>
            </div>
            <Link href="/cart" legacyBehavior>
                <a className={styles.cart}>
                    <FaOpencart />
                    <span>{cart.length}</span>
                </a>
            </Link>
        </div> 
    </div>
  )
}
