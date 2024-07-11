import { useState, useEffect } from 'react'
import { Card, CardProduto } from './components/Card'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'


import 'leaflet/dist/leaflet.css';

import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import "leaflet-defaulticon-compatibility"; //tem que dar npm i leaflet-defaulticon-compatibility

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function App() {
  const position = [-25.42474811725821, -49.27225551560059]
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")
  const [character, setCharacter] = useState("")

  useEffect(() => {
    api.get(`/character/?page=${page}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        alert("Esta pagina não contem este personagem")
      }
      console.error(error)
    })
  }, [page])

  function searchCharacter(text) {
    setCharacter(text)
    if (character.length <= 0)
      return;

    api.get(`/character/?name=${character}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        setCharacter("")
        alert('Esse personagem não foi encontrado!')
      }
      console.error(error)
    })
  }

  return (
    <>
      <div className={style.wrapBtns}>
        <button onClick={() => setShow("prod")}>Produtos</button>
        <button onClick={() => setShow("api")}>API</button>
        <button onClick={() => setShow("map")}>Mapa</button>
      </div>
      <div>
        <h1>Exercícios de manutenção</h1>
        <h2>Showroom de produtos</h2>
        <div className={style.wrapPage}>
          {show === "prod" &&
            <>
                {produtos.map((item) => {
                  return (
                    // aqui o branco é o nome passado no json (name) e verde sao os parametros do card (nome)
                    <CardProduto nome={item.name} desc={item.desc} value={item.value} image={item.image} categoria={item.categoria} status={item.status} key={item.id} />
                  )
                })}
            </>
          }
        </div>
        {show === "api" &&
          <>
            <h2>Rick and Morty API</h2>
            <div>
              <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)} />
              <input type="text" placeholder="Rick Sanchez" value={character} onChange={(event) => searchCharacter(event.target.value)} />
            </div>
            <div className={style.wrapPage}>
              {data.map((item) => {
                return (
                  <div key={item.id}>
                    <Card nome={item.name} status={item.status} species={item.species} type={item.type} gender={item.gender} image={item.image} />
                    {/* <button onClick={() => {}}>Info</button> */}
                  </div>
                )
              })}
            </div>
          </>
        }

        {show === "map" &&
          <>
            <h2>Mapa</h2>
            <MapContainer style={{height: 800}} center={position} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </>
        }
      </div>
    </>
  )
}

export default App
