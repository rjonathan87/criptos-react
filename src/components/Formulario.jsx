import styled from "@emotion/styled";
import { useState } from "react";
import { useEffect } from "react";
import { monedas } from "../../monedas";
import useSelectMonedas from "../hooks/useSelectMonedas";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;
  &:hover{
    background-color: #7a7dfe;
    cursor: pointer;
  }
`

const Formulario = () => {
  const [ criptos, setCriptos ] = useState([])
  
  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
  const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu Criptomoneda', criptos)

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const res = await fetch(url)
      const json = await res.json()
      const arrayCriptos = json.Data.map( crypto => {
        const objeto = {
          id: crypto.CoinInfo.Name,
          nombre: crypto.CoinInfo.FullName,
        }
        return objeto
      })
      setCriptos(arrayCriptos)
    }

    consultarAPI();
  }, []) 
  

  return (
    <form>
      <SelectMonedas />
      <SelectCriptomoneda />
      <InputSubmit type='submit' value="Cotizar" />
    </form>
  )
}

export default Formulario