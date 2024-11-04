import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const jobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {

  const { allJobs } = useSelector((state) => state.job)

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          allJobs.length === 0 ? <span>No Jobs available</span> : allJobs.map((job, idx) =>
            <motion.div initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}>
              <LatestJobCard job={job} key={job._id} />
            </motion.div>
          )
        }
      </div>
    </div>
  )
}

export default LatestJobs
