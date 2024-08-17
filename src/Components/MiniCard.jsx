import React, { useEffect, useState } from "react";
// importing index.css
import '../index.css'
// Importing our weather icons
import sun from '../assets/icons/smiling-sun.png'
import rain from '../assets/icons/rain-cloud.png'
import cloud from '../assets/icons/blue_cloud.png'

const MiniCard = ({time, temp, iconString}) => {

    const [icon, setIcon] = useState()

    useEffect(() => {
        if(iconString){
            if(iconString.toLowerCase().includes('cloud')){
                setIcon(cloud)
            }else if(iconString.toLowerCase().includes('rain')){
                setIcon(rain)
            }else if(iconString.toLowerCase().includes('sun')){
                setIcon(sun)
            }
        }
    }, [iconString])
    return (
        <>
        <div className="glassCard w-[10rem] h-[10rem] p-4 flex flex-col">
            <p className="text-center">
                {new Date(time).toLocaleDateString('en',{weekday: 'long'})}
            </p>

            <hr />

            <div className="w-full justify-center items-center flex">
                <img src={icon} alt="weather_icon" className="w-[4rem] h-[4rem]" />
            </div>

            <p className="text-center font-bold">{temp}&deg;C</p>
        </div>
        </>
    )
}

export default MiniCard;