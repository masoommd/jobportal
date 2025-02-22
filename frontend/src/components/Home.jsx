import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(user?.role==='recruiter'){
      navigate("/admin/companies");
    }
    dispatch(setSearchQuery(""));
  },[])
  return (
    <div>
      <Navbar />
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  );
};

export default Home;
