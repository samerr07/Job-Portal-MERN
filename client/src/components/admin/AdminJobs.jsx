import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import AdminJobsTable from './AdminJobsTable'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const AdminJobs = () => {

    useGetAllAdminJobs()
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(setSearchJobByText(input))
      },[input])

  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
            <Input
               className="w-fit"
               placeholder="Filter by name, role"
               onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={()=>navigate("/admin/jobs/create")}>New Jobs</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  )
}

export default AdminJobs
