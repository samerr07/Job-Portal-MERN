import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';



const Browse = () => {

  useGetAllJobs()
  const dispatch = useDispatch()
  const {allJobs} = useSelector((state)=>state.job)


  useEffect(()=>{
     return ()=>{
      dispatch(setSearchQuery(""))
     }
  },[])

  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Results (3)</h1>
        <div className='grid grid-cols-3 gap-4'>
            {
                allJobs.map((e,i)=>(
                    <Job job={e}/>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default Browse
