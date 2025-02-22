import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  }
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
        <h1 className='text-5xl  font-bold'>Discover, Apply & <br />Achieve Your <span className='text-[#20948B]'>Dream Jobs</span></h1>
        <p className='text-lg'>Your career journey starts here. Job<span className="text-[#F83002] ">Spark</span> streamlines your job search, connecting you with the <span className='text-[#1e6862]'>work</span> you deserve and helping companies <span className='text-[#1e6862]'>hire</span> exceptional <span className='text-[#1e6862]'>talent</span>.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input type="text"
            placeholder='Find your dream jobs'
            className='outline-none border-none w-full'
            onChange={(e)=>setQuery(e.target.value)}
            />
            <Button onClick={searchJobHandler} className="rounded-r-full bg-[#20948B] hover:bg-[#23e0d1]">
            <Search className='h-5 w-5'/>
            </Button>
        </div>
        </div>
    </div>
  )
}

export default HeroSection