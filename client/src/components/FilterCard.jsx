import React, { useDebugValue, useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { Checkbox } from './ui/checkbox'

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
]


const FilterCard = () => {

  const [selectedValue, setSelectedValue] = useState("")
  const [clear, setClear] = useState(false)
  const dispatch = useDispatch()
  

  const handleSelect = (value) => {
    if(clear){
      setClear(false)
    }
    setSelectedValue(value)
  }

  const handleClearFilter = (value)=>{
    setClear(value)
    if(value){
      setSelectedValue("")
    }
  }

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue))

  }, [selectedValue])

  return (
    <div className='w-full bg-white p-3 rounded-s-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <div className="flex items-center my-2 space-x-2">
        <Checkbox id="terms" checked={clear}  onCheckedChange={handleClearFilter} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Clear Filter
        </label>
      </div>
      <RadioGroup value={selectedValue} onValueChange={handleSelect}>
        {
          fitlerData.map((item, index) => (
            <div>
              <h1 className='font-bold text-lg'>{item.fitlerType}</h1>
              {
                item.array.map((ite, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={ite} id={itemId} />
                      <Label htmlFor={itemId}>{ite}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
