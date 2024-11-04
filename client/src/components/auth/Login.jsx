import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/config'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'

const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading,user} = useSelector((state)=> state.auth)


    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(input)
        try{
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
             headers:{
                 "Content-Type": "application/json",
             },
             withCredentials:true
            })
 
            if(res.data.success){
             navigate("/");
             dispatch(setUser(res.data.user))
             toast.success(res.data.message)
            }
         }catch(err){
             console.log(err)
             toast.error(err.res.data.message);
         } finally{
            dispatch( setLoading(false) )
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
                                    onChange={handleChange}
                                    checked={input.role === "student"}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="option-one">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    value="recruiter"
                                    name="role"
                                    onChange={handleChange}
                                    checked={input.role === "recruiter"}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                       loading ?  <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : 
                       <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    
                    <span className='text-sm'>Don't have an account?<Link className='text-blue-600' to={"/signup"}>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login;
