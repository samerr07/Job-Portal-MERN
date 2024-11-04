import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {

    useGetAppliedJobs()
    const {appliedJobs} = useSelector((state)=>state.job)
    console.log(appliedJobs)

    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        appliedJobs?.map((e, i) => (
                            <TableRow key={i}>
                                <TableCell>{e.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{e.job.title}</TableCell>
                                <TableCell>{e.job.company.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`${e.status === "rejected" ? 'bg-red-400' : e.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{e.status.toUpperCase()}</Badge></TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </div>
    )
}

export default AppliedJobTable
