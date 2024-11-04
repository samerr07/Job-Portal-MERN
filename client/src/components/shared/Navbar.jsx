import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/config'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/")
                toast.success(res?.data?.message)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message)
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex items-center font-medium gap-5'>
                        {
                            user?.role === "recruiter" ? (
                                <>
                                    <li><Link to={"/admin/companies"}>Companies</Link></li>
                                    <li><Link to={"/admin/jobs"}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to={"/"}>Home</Link></li>
                                    <li><Link to={"/jobs"}>Jobs</Link></li>
                                    <li><Link to={"/browse"}>Browse</Link></li>
                                </>
                            )

                        }
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Button variant="outline"><Link to={"/login"}>Login</Link></Button>
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]"><Link to={"/signup"}>Signup</Link></Button>
                            </div>

                        ) : (
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar>
                                        <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-[80]">
                                    <div>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullName}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user?.role === "student" && (
                                                    <div className='flex w-fit items-center cursor-pointer gap-2'>
                                                        <User2 />
                                                        <Button variant="link"><Link to={"/profile"}>View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center cursor-pointer gap-2'>
                                                <LogOut />
                                                <Button onClick={handleLogout} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }



                </div>
            </div>
        </div>
    )
}

export default Navbar
