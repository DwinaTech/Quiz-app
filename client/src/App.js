import {useState, useEffect} from "react";
import axios from "axios";
import './App.css';

const App = () =>  {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    const { data } = await axios.get(`http://api.zoopla.co.uk/api/v1/property_listings.json?postcode=g314dn&area=london&api_key=${process.env.REACT_APP_ZOOPLA_KEY}`)
    setProperties(data)
  }

  useEffect(() => {
    fetchProperties()
  }, [])
  console.log({ properties });
  return <h1>Dream House</h1>
}

export default App;
