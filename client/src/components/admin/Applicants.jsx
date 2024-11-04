import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/config'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setApplicants } from '@/redux/applicationSlice'

const Applicants = () => {

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get/${params.id}/applicants`,{withCredentials:true})

                if (res?.data?.success) {
                    dispatch(setApplicants(res?.data?.job))
                   
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchApplicants()
    }, [])


    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants
