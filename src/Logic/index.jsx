import { useContext, createContext, useState, useEffect, Children } from "react";
import axios from "axios";

const StateContext = createContext()

export const StateContextProvider = ({children}) => {
    const [weather, setWeather] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('New York')
    const [thisLocation, setLocation] = useState('')

    const apiKey = import.meta.env.VITE_API_KEY;


    // Fetch Api
    const fetchWeather = async() => {
        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnbNames: 0,
            },
            headers:{
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com',
            }
        };

        try{
            const response = await axios.request(options);
            console.log(response.data)

            if (response.data && response.data.locations) {
                const thisData = Object.values(response.data.locations)[0];
    
                if (thisData) {
                    setLocation(thisData.address);
                    setValues(thisData.values);
                    setWeather(thisData.values[0]);
                } else {
                    throw new Error("Location data is undefined or empty.");
                }
            } else {
                throw new Error("API response is missing locations data.");
            }

        }catch(e){
            //if the api throws error
            console.log(e);
            alert(`Error fetching weather data: ${e.message}`);
        }
    }

    useEffect(() => {
        fetchWeather()
    }, [place])

    useEffect(() => {

        console.log(values)
        
    }, [values])

    return (
       <StateContext.Provider value={{
        weather, setPlace, values, thisLocation, place
       }}>
           {children}
       </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)