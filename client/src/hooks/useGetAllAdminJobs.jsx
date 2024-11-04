import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/config'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getAdminJob`, { withCredentials: true })
                if (res?.data?.success) {
                    dispatch(setAllAdminJobs(res?.data?.jobs))
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchAllAdminJobs()
    },[])
}

export default useGetAllAdminJobs
