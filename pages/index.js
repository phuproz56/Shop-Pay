import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main/index.js";



const inter = Inter({ subsets: ["latin"] });

export default function Home({ country }) {
  const { data: session } = useSession();
  // console.log(session);
  return (
    <>
      <Header country={country} />
      {/* { session ? "you are logged in" : "you are not logged in" } */}
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  let data = await axios
    .get("https://api.ipregistry.co/?key=whzhvdca3jwcascn")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      country: {
        name: data.name,
        flag: "https://png.pngtree.com/png-clipart/20200424/ourlarge/pngtree-round-creative-ink-brush-brush-vietnam-flag-png-image_2192072.jpg",
      },
    },
  };
}
