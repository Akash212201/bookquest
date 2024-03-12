import React, { useEffect, useState } from "react"
import Hero from './Hero'
import Upcomming from "./Upcomming"
import Newsletter from './Newsletter';
import { groupCategory } from "../services/operations/bookcategory";

const HomePage = () => {

  
  const [categorybooks,setcategorybooks]=useState([])
  const [latestbooks,setlatestbooks]=useState([])
  const [mostSellingBooks,setmostSellingBooks]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await groupCategory();
        console.log("resp", resp.data);

        setcategorybooks(resp.data.categorybooks)
        setlatestbooks(resp.data.mostrecentbooks)
        setmostSellingBooks(resp.data.mostSellingBooks)
      } catch (error) {
        console.error(error); // Use console.error for errors
      }
    };
  
    fetchData();

  }, [])



  return (
    <div>
      <Hero />
      <Upcomming books={categorybooks} title="Upcoming Books" />
      <Upcomming books={latestbooks} title="New Arrival" />
      <Upcomming books={mostSellingBooks} title="Bestseller" />
      <Newsletter />
    </div>
  );
};
export default HomePage 
