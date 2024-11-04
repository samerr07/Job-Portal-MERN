import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Edit, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'


const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {

    const [open, setOpen] = useState(false);
    const {user} = useSelector((state)=>state.auth)

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto p-8 bg-white border border-gray-200 rounded-2xl my-5'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="cursor-pointer h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>

                    <Button onClick={()=>setOpen(true)} variant="outline" className="text-right"><Pen /></Button>
                </div>

                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail/>
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact/>
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1 my-2'>
                        {
                            user?.profile?.skills?.length !==0 ? ( user?.profile?.skills?.map((skill,idx)=>(
                                <Badge key={idx}>{skill}</Badge>)
                            )) : <span>NA</span>
                        }
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer' target='blank'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-white rounded-2xl '>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable/>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
