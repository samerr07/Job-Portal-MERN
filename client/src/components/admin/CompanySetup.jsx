import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/config'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {

    const params = useParams()
    useGetCompanyById(params.id)
    const navigate = useNavigate()
    const {singleCompany} = useSelector((state)=>state.company)
    const [loading, setLoading] = useState(false)
    

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const handleFileChange = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        
        if(input.file){
            formData.append("file", input.file)
        }
        
        try{
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/updateCompany/${params.id}`,formData,{
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                withCredentials:true,
            })
            if(res?.data?.success){
                console.log(res?.data?.message)
                toast.success(res?.data?.message)
                navigate("/admin/companies")
            }
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany])

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={handleSubmit}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={()=>navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                onChange={handleChange}
                                value={input.description}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                onChange={handleChange}
                                value={input.website}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                onChange={handleChange}
                                value={input.location}
                            />
                        </div>
                        <div >
                            <Label>Logo</Label>
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
                       <Button type="submit" className="w-full my-4">Update</Button>
                    }
                    
                </form>
            </div>

        </div>
    )
}

export default CompanySetup
