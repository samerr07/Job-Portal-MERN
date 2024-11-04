import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/config'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const PostJob = () => {

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { companies } = useSelector((state) => state.company)

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSelect = (value) => {
    const selectedCompany = companies?.find((company) => company.name.toLowerCase() === value)
    setInput({ ...input, companyId: selectedCompany?._id })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        navigate("/admin/jobs")
      }
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center w-screen my-5'>
        <form onSubmit={handleSubmit} className='p-8 max-w-4xl border border-gray-300 shadow-lg rounded-md'>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                onChange={handleChange}
                value={input.title}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                onChange={handleChange}
                value={input.description}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                onChange={handleChange}
                value={input.requirements}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                onChange={handleChange}
                value={input.salary}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                onChange={handleChange}
                value={input.location}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                onChange={handleChange}
                value={input.jobType}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                onChange={handleChange}
                value={input.experience}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                type="number"
                name="position"
                onChange={handleChange}
                value={input.position}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            {
              companies?.length > 0 && (
                <Select onValueChange={handleSelect}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        companies?.map((company) => (
                          <SelectItem value={company?.name.toLowerCase()}>{company?.name}</SelectItem>
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )
            }
          </div>


          {
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Post New Job</Button>
          }

          {
            companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
          }
        </form>
      </div>
    </div>
  )
}

export default PostJob
