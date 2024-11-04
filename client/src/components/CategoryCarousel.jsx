import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const CategoryCarousel = () => {

    const category = [
        "Frontend Developer", 
        "Backend Developer", 
        "Data Science", 
        "Machine Learning",
        "Graphic Designer",
        "FullStack Developer"
    ]

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const searchHandler = (cat) => {
        dispatch(setSearchQuery(cat))
        navigate("/browse")
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat,idx)=>(
                            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                                <Button onClick={()=>searchHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel> 
            


        </div>
    )
}

export default CategoryCarousel
