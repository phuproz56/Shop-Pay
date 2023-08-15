
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function Home( { country } ) {
  console.log(country);
  return (
    <div>
      <Header country={country} />
      <Footer country={country} />

      
    </div>
  )
}

export async function getServerSideProps() {
  let data = await axios.get('https://api.ipregistry.co/?key=whzhvdca3jwcascn').then((res) => {
    return res.data.location.country;
  }).catch((err) => {
    console.log(err);
  });
  return {
    props: {
      country: {name: data.name, flag: "https://png.pngtree.com/png-clipart/20200424/ourlarge/pngtree-round-creative-ink-brush-brush-vietnam-flag-png-image_2192072.jpg"},
    }
  }
}