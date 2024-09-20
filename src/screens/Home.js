import React, { useState, useEffect } from 'react'
import Navber from '../components/Navber'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousal from '../components/Carousal'

export default function Home() {
  const[search ,setSearch] =useState("")
  const [footCat, setFootCat] = useState([]);
  const [footItem, setFootItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    // console.log(response[0],response[1]);
    setFootItem(response[0]);
    setFootCat(response[1]);
  }
  useEffect(() => {
    loadData()
  }, [])//only one time call because []


  return (
    <div >
      <div><Navber /></div>
      {/* ========================Carousal================ */}

      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }} >
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{ zIndex: "12" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
              
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/300×300?burger" className="d-block w-100 fix-img" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300×300?pastry" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300×300?barbeque" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>

      <div className='m-3 container'>
        {
          footCat != []
            ? footCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {footItem != [] ? footItem.filter((item) => (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItem => {
                      return (
                        <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodName={filterItem.name}
                            options={filterItem.options[0]}
                            imgSrc={filterItem.img}

                          /></div>
                      )
                    }
                    ) :
                    <div>No Data Found"</div>

                  }
                </div>
              )
            })
            : ""
        }


      </div>
      <div><Footer /></div>
    </div>
  )
}
