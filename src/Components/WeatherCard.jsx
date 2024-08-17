import React, { useEffect, useState } from "react";
import { useDate } from '../utils/useDate';
import '../index.css';

// Importing weather icons
import sun from '../assets/icons/smiling-sun.png';
import rain from '../assets/icons/rain-cloud.png';
import cloud from '../assets/icons/blue_cloud.png';

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions
}) => {
  const [icon, setIcon] = useState(sun);
  const { time } = useDate();

  useEffect(() => {
    if (iconString) {
      const iconLower = iconString.toLowerCase();
      if (iconLower.includes('cloud')) {
        setIcon(cloud);
      } else if (iconLower.includes('rain')) {
        setIcon(rain);
      } else if (iconLower.includes('sun')) {
        setIcon(sun);
      } else if (iconLower.includes('wind')) {
        setIcon(winds);
      } else if (iconLower.includes('humid')) {
        setIcon(humid);
      }
    }
  }, [iconString]);

  return (
   <>
    <div className="w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4">
      <div className="flex w-full justify-center items-center gap-4 mt-12 mb-4">
        <img src={icon} alt="weather_icon" />
        <p className="font-bold text-5xl flex justify-center items-center">
          {typeof temperature === 'number' ? `${temperature} °C` : 'N/A'}
        </p>
      </div>

      <div className="font-bold text-center text-xl">
        {typeof place === 'string' ? place : 'Location'}
      </div>

      <div className="flex w-full justify-between items-center mt-4">
        <p className="flex-1 text-center p-2">{new Date().toDateString()}</p>
        <p className="flex-1 text-center p-2">{time}</p>
      </div>

      <div className="flex w-full justify-between items-center gap-4 mt-4">
        <div className="flex-1 text-center p-2 font-bold bg-blue-600">
          Wind Speed
          <p className="font-normal">{typeof windspeed === 'number' ? windspeed : 'N/A'}</p>
        </div>

        <div className="flex-1 text-center p-2 font-bold rounded-lg bg-green-500">
          Humidity
          <p className="font-normal">{typeof humidity === 'number' ? humidity : 'N/A'}</p>
        </div>
      </div>

      <div className="w-full p-3 mt-4 flex justify-between items-center">
        <p className="font-semibold text-lg">Heat Index</p>
        <p className="text-lg">{heatIndex != null ? heatIndex : 'N/A'}</p>
      </div>

      <hr className="bg-slate-600" />

      <div className="w-full p-4 flex justify-center items-center text-3xl font-semibold">
        {typeof conditions === 'string' ? conditions : 'Conditions'}
      </div>
    </div>
   </>
  );
};

export default WeatherCard;
