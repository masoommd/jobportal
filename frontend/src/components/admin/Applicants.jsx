import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const jobId = params.id;
  const {applicants} = useSelector(state => state.application)
  useEffect(()=>{
    const fetchAllApplicant = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`, {withCredentials:true} )
        if(res.data.success){
          dispatch(setAllApplicants(res.data.job))
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchAllApplicant();
  },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length})</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants