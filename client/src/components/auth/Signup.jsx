import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/config'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading,user} = useSelector((state)=>state.auth)

    const handleFileChange = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if(input.file){
            formData.append("file", input.file)
        }
       
        try{
            dispatch(setLoading(true))
           const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            },
            withCredentials:true
           })

           if(res.data.success){
            navigate("/login");
            toast.success(res?.data?.message)
           }
        }catch(err){
            console.log(err)
            toast.error(err.response.data?.message);
        } finally{
            dispatch(setLoading(false))
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/")
        }
    },[])

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center mx-auto max-w-7xl'>
                <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>SignUp</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            placeholder="Enter your full name"
                            value={input.fullName}
                            name="fullName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="abc@gmail.com"
                            value={input.email}
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            placeholder="9874563210"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="123456"
                            value={input.password}
                            name="password"
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5" >
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    value="student"
                                    name="role"
                                    checked={input.role === "student"}
                                    onChange={handleChange}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="option-one">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    value="recruiter"
                                    name="role"
                                    checked={input.role === "recruiter"}
                                    onChange={handleChange}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                className="cursor-pointer"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    {
                       loading ?  <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : 
                       <Button type="submit" className="w-full my-4">Signup</Button>
                    }
                    
                    <span className='text-sm'>Already have an account?<Link className='text-blue-600' to={"/login"}>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup