import { createContext, useEffect, useState } from 'react'
import { BrowserRouter , Routes , Route, useNavigate } from 'react-router-dom'

import { Login } from './Componentes/Login'
import { Header } from './Componentes/Header'
import { Register } from './Componentes/Register'
import { Notes } from './Componentes/Notes'
import { Footer } from './Componentes/Footer'

import './App.css'

export const NotionContext = createContext()

function App() {

  const [ isLogged , setIsLogged ] = useState(false)


  return ( 
    <NotionContext.Provider value={{ isLogged , setIsLogged }}>

    <BrowserRouter>

    <>
      <Routes>

        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/notes' element={<Notes/>} />

      </Routes>
      <Footer />
    </>

    </BrowserRouter>
    </NotionContext.Provider>

  )
}

export default App
