import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import InvoiceDetail from './pages/InvoiceDetail'
import {useState} from 'react'

function App() {
  let [lightMode, setLightMode] = useState(JSON.parse(localStorage.getItem('lightMode')))
  if(lightMode === null){
    localStorage.setItem('lightMode',true)
    setLightMode(true)
  }
  function updateLightMode(){
    localStorage.setItem('lightMode',!lightMode)
    setLightMode(prevLightMode => !prevLightMode)
  }
  
  return (
    <Routes>
      <Route path='/user/register' element={<Register updateLightMode={updateLightMode} lightMode={lightMode} />}/>
      <Route path='/user/login' element={<Login updateLightMode={updateLightMode} lightMode={lightMode} />}/>
      <Route path='/' element={<Home updateLightMode={updateLightMode} lightMode={lightMode} />}/>
      <Route path='/:id' element={<InvoiceDetail updateLightMode={updateLightMode} lightMode={lightMode} />}/>
    </Routes>
  )
}

export default App
