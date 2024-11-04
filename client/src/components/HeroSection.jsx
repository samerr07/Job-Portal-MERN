import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

const HeroSection = () => {

  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearch = () => {
    dispatch(setSearchQuery(query))
    console.log(query)
    navigate("/browse")
  }

  return (
    <motion.div className='text-center'
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}>
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
        <p>Empowering careers with meaningful connections, unlocking potential, bridging dreams to reality, and guiding you every step to success!</p>

        <div className='flex w-[40%] shadw-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input type="text"
            placeholder='Find your dream jobs'
            className='outline-none border-none w-full'
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={handleSearch} className="rounded-r-full bg-[#6A38C2]">
            <Search className='w-5 h-5' />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default HeroSection
