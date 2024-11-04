import { COMPANY_API_END_POINT } from '@/utils/config'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllCompanies } from '@/redux/companySlice'

const useGetAllCompanies = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/getCompany`, { withCredentials: true })
                if (res?.data?.success) {
                    
                    dispatch(setAllCompanies(res?.data?.company))
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchAllCompanies()
    },[])
}

export default useGetAllCompanies
