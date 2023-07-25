import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // HERE I STORE THE INFORMATION
  const [data, setData] = useState([])

  // THIS WILL DICTATE WHEN WE WANT TO GET THE INFORMATION 
  useEffect(()=>{
    getData()
    console.log(data);
  }, [])

  // THIS FUNCTION IS IN CHARGE OF GETTING THE INFORMATION WHENEVER IT'S CALLED UPON AND STORE IT IN THE STATE "data"
  const getData = () => {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
              setData(json)
              // console.log(json);
              })
            .catch(err => console.log(err))
  }

  return (
    <>
      {
        data ?
        data.map(element => 
          <div id={element.id}>
            <h2>{element.title}</h2>
            <p>{element.description}</p>
            <h4>PRICE: {element.price}</h4>
            <img src={element.image}/>
          </div>)
          :
          <h3>LOADING</h3>
      }
    </>
  )
}

export default App
