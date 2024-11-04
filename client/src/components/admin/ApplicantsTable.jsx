import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useSelector } from 'react-redux'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/config'
import { toast } from 'sonner'


const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {

    const { applicants } = useSelector((state) => state.application)
    
    const handleStatus = async(status,applicationId)=>{
        try{
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${applicationId}/update`,{status},{withCredentials:true})

            if(res?.data?.success){
                toast.success(res?.data?.message)
            }
        }catch(err){
            console.log(err)
            toast.error(err.res.data.message)
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead >FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants &&
                        applicants?.applications.map((item) => (
                            <TableRow key={item._id} >
                                <TableCell>{item?.applicant?.fullName}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus?.map((status1, idx) => (
                                                    <div onClick={()=>handleStatus(status1, item._id)} className='flex w-fit items-center my-2 cursor-pointer'>
                                                        {status1}
                                                    </div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

        </div>
    )
}

export default ApplicantsTable
