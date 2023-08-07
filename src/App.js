import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import './App.css';

const HomeConatiner = styled.div`
  font-size: 30px;
  text-align: center;
`

const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  width: 100%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 12px;
`

const Container = styled.div`
  max-width: 700px;
  height: 700px;
  margin: auto;
  padding 0 1rem;
  position: relative;
  top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Temp = styled.div`
  font-size: 6rem;
  text-align: center;
`

const Desc = styled.div`
  font-size: 30px;
  text-align: center;
  right: -90%;
  transform-origin: 0, 0;
  transform: rotate(269deg);
`

const Feels = styled.div`
  font-size: 30px;
  text-align: center;
`



function App() {



  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=5003e4f5c469e5138f5bb62467bee9d9`;
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
        axios.get(url).then((response) => {
            setData(response.data);
            console.log(response.data);
        });

        setLocation('')
    }
}

  

  return (
    <>
      <div className="app">
        
        <div className="search">
          <input
          value = {location}
          onChange = {event=> setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Search Location"
          
          type='text'/>

</div>
        
        <Container>
          <HomeConatiner>{data.name}</HomeConatiner>


          <Temp>{data.main ? <h1>{data.main.temp}°F</h1> : null}</Temp>

          <Desc>{data.weather ? <p> {data.weather[0].main}</p>: null}</Desc>

        </Container>

        {data.name !== undefined && 

<Bottom>

<Feels> Feels Like: {data.main.feels_like}°F</Feels>

<HomeConatiner>Humidity: {data.main.humidity}%</HomeConatiner>

<HomeConatiner>Wind Speed: {data.wind.speed} MPH</HomeConatiner>
</Bottom>
        
        
        }
   
      </div>
    </>
  );
}

export default App;
