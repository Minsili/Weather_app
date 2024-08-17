import React, { useEffect, useState } from "react";
import { useStateContext } from "../Logic";
// Importing the different images
import Clear from '../assets/images/clear-day.jpg'
import Sunny from '../assets/images/sky-cloud.jpg'
import Rainy from '../assets/images/rainy-day.jpg'

const BgLayout = () => {
    const { weather } = useStateContext();
    const [image, setImage] = useState(Sunny); // Default to Rainy

    useEffect(() => {
        console.log('Current weather conditions:', weather.conditions); // Debugging log

        if (weather && weather.conditions) {
            const imageString = weather.conditions.toLowerCase();

            if (imageString.includes('clear')) {
                setImage(Clear);
            } else if (imageString.includes('sunny')) {
                setImage(Sunny);
            } else if (imageString.includes('rain') || imageString.includes('cloud')) {
                setImage(Rainy); // This will match "Rain" or "cloudy"
            }
        }
    }, [weather]);

    return (
        <img src={image} alt="Weather_image" className="h-screen w-full fixed left-0 top-0 -z-[10]" />
    );
}

export default BgLayout;
