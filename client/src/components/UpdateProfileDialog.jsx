import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/config'
import { setUser } from '@/redux/authSlice'

const UpdateProfileDialog = ({open,setOpen}) => {

    const [loading, setLoading] = useState(false)
    const {user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
   
    const [input, setInput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map((skill)=>skill) || "",
        file:user?.profile?.resume || "",
    })
   
   

    const handleFileChange = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        
    }



    const handleSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if(input.file){
            formData.append("file", input.file)
        }

        try{
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/updateUser`, formData,{
                headers:{
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
            if(res?.data?.success){
                dispatch(setUser(res?.data?.user))
                toast.success(res?.data?.message)
            }
        }catch(err){
            console.log(err)
            toast.error(err.response.data.message);
        } finally{
            setLoading(false)
        }
        setOpen(false)
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={()=>setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>

                    <form action="" onSubmit={handleSubmit}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input
                                   id="name"
                                   name="fullName"
                                   type="text"
                                   value={input.fullName}
                                   className="col-span-3"
                                   onChange={handleChange}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                   id="email"
                                   name="email"
                                   type="email"
                                   value={input.email}
                                   className="col-span-3"
                                   onChange={handleChange}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className="text-right">Number</Label>
                                <Input
                                   id="number"
                                   name="phoneNumber"
                                   type="text"
                                   value={input.phoneNumber}
                                   className="col-span-3"
                                   onChange={handleChange}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input
                                   id="bio"
                                   name="bio"
                                   type="text"
                                   value={input.bio}
                                   className="col-span-3"
                                   onChange={handleChange}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input
                                   id="skills"
                                   name="skills"
                                   value={input.skills}
                                   className="col-span-3"
                                   onChange={handleChange}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className="text-right">Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="col-span-3 cursor-pointer"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default UpdateProfileDialog
