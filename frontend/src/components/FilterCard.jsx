import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType:"Location",
        array:["Noida","Banglore","Hyderabad","Pune","Kolkata"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer", "Backend Developer","FullStack Developer","Python Developer"]
    },
    {
        filterType:"Job Type",
        array:["Full Time", "Part Time"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch()

    const changeHandler = (value) =>{

        setSelectedValue(value);
    }

    useEffect(()=>{
        dispatch(setSearchQuery(selectedValue))
    },[selectedValue])
  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3' />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        <div className='flex gap-2'>
        <RadioGroupItem id="clear" value=""/>
        <Label htmlFor="clear">Clear</Label>
        </div>
            {
                filterData.map((data,index) => (
                    <div key={index}>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item,idx) => {
                                const itemId = `r${index}-${idx}`
                                return (
                                    <div key={idx} className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem id={itemId} value={item}/>
                                        <Label htmlFor={itemId}>{item}</Label>
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