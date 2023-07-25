import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // HERE I STORE THE INFORMATION
  const [data, setData] = useState([])
  const [newItem, setItem] = useState({
    title: 'Batch 41 magic bullet blender from the future',
    price: 129.5,
    description: ' If you send an object like the code above, it will return you an object with a new id. remember that nothing in real will insert into the database. so if you want to access the new id you will get a 404 error.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbkWZA4N7aDoblltBPajZ-H8Ts7fRfxQI0_A&usqp=CAU',
    category: 'electronic'
})

  // THIS WILL DICTATE WHEN WE WANT TO GET THE INFORMATION 
  useEffect(()=>{
    getAllData()
    // console.log(data);
  }, [])

  // THIS FUNCTION IS IN CHARGE OF GETTING THE INFORMATION WHENEVER IT'S CALLED UPON AND STORE IT IN THE STATE "data"
  const getAllData = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res=>res.json())
      .then(json=>{
        setData(json)
        // console.log(json);
        })
      .catch(err => console.log(err))
  }

  const getSingleData = (id) => {
    // USING FETCH 
    // fetch(`https://fakestoreapi.com/products/${id}`)
    //   .then(res=>res.json())
    //   .then(json=>{
    //     let payload = [json]
    //     setData(payload)
    //     // console.log(payload);
    //     })
    //   .catch(err => console.log(err))

    // USING AXIOS 
    axios(`https://fakestoreapi.com/products/${id}`).then(res => setData([res.data]))
  }

  const CreateNewItem = () => {
    let payload = {
      title: 'Batch 41 magic bullet blender from the future',
      price: 129.5,
      description: ' If you send an object like the code above, it will return you an object with a new id. remember that nothing in real will insert into the database. so if you want to access the new id you will get a 404 error.',
      image: 'https://i.pravatar.cc',
      category: 'electronic'
  }

  // payload = JSON.stringify(payload);

    // fetch('https://fakestoreapi.com/products',{
    //   method: "POST",
    //   header: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: payload,
    // })
    // .then(res => {
    //   res.json()
    // })
    // .then(data => {
    //   console.log(data);

    //   setData([data])
    // })
    // .catch(error => console.log(error))

    axios({
      method: 'post',
      url: 'https://fakestoreapi.com/products',
      data: payload
    }).then(res => setData([res.data]))

  }

  return (
    <>
      <div className='container taks-container'>
        <h2>Get all products</h2>
        <button onClick={getAllData}>Click here</button>
      </div>

      <div className='container taks-container'>
        <h2>Get a single product by ID</h2>
        <input type="text" onChange={(event)=>getSingleData(Number(event.target.value))}></input>
      </div>

      <div className='container taks-container'>
        <h2>Create a new product</h2>
        <button onClick={CreateNewItem}>Click here</button>
      </div>

      <div className='container results-container'>
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
      </div>
    </>
  )
}

export default App
