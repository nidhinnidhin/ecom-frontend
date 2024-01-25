import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button } from '@mui/material';
import Navbar from './components/navbar';
import Products from './components/products';
import MegaMenu from './components/mega-menu';
import SliderItems from './components/slider';
import Announcement from './components/announcement';
import BestProducts from './components/best-products';
import TopDeals from './components/top-products';
import Coopens from './components/coopens';
import FashionProducts from './components/fashion-products';
import Footer from './components/footer';
import { useEffect } from 'react';
import RegisterPopUp from './components/register-popup';

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:8000");
  const datas = await res.json();
  const sliderRes = await fetch("http://localhost:8000/slider/");
  const sliderDatas = await sliderRes.json();
  const BestProductRes = await fetch("http://localhost:8000/bestproduct/");
  const BestProductDatas = await BestProductRes.json();
  const TopProductRes = await fetch("http://localhost:8000/topproduct/");
  const TopProductDatas = await TopProductRes.json();
  const FashionProductRes = await fetch("http://localhost:8000/fashionproduct/");
  const FashionProductDatas = await FashionProductRes.json();
  // const AnnouncementRes = await fetch("http://localhost:8000/bankdiscount/");
  // const AnnouncementDatas = await AnnouncementRes.json();
  const ProductDiscountRes = await fetch("http://localhost:8000/bankdiscount/productdiscount/");
  const ProductDiscountDatas = await ProductDiscountRes.json();

  return {
      props: {
        posts: datas,
        sliderPosts: sliderDatas,
        bestProducts: BestProductDatas,
        topProducts: TopProductDatas,
        fashionProducts: FashionProductDatas,
        // AnnouncementData: AnnouncementDatas,
        ProductDiscountData: ProductDiscountDatas,
      },
    }
}


export default function Home({posts, sliderPosts, bestProducts, topProducts, fashionProducts, AnnouncementData, ProductDiscountData}) {
  useEffect(()=>{
    // console.log(ProductDiscountData)
  }, [])
  return (
    <>
    <div className={styles.home}>
      <RegisterPopUp/>
      <Navbar/>
      <MegaMenu datass={posts}/>
      <SliderItems datass={sliderPosts}/>
      {/* <Announcement datass={AnnouncementData}/> */}
      <BestProducts datass={bestProducts}/>
      <TopDeals datass={topProducts}/>
      <Coopens datass={ProductDiscountData}/>
      <FashionProducts datass={fashionProducts}/>
      <Footer/>
      {/* <Products/> */}
    </div>
    </>
  )
}
