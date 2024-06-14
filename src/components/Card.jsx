import './style.css';

/* eslint-disable react/prop-types */
export const Card = ({nome, status, species, type, gender, image}) => {
  return(
      <div className='container'>
          <h1>{nome}</h1>
          <h2>{species}</h2>
          <p>{status}</p>
          <p>{type}</p>
          <p>{gender}</p>
          <img src={image} alt={nome} width={150} height={"auto"}/>
      </div>
  )
}

export const CardProduto = ({nome, desc, value, image, categoria, status}) => {
  return(
      <div className='container'>
          <h1>{nome}</h1>
          <h2>{desc}</h2>
          <div className='align'>
            <p className='separate'>R$ {value}</p> 
            <div className={status == true ? 'Disp' : 'Indisp'}></div>
          </div>
          <h2>{categoria}</h2>
          <img src={image} alt={nome} width={150} height={"auto"}/>
      </div>
  )
}