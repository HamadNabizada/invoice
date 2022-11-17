import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import InvoiceDetail from './pages/InvoiceDetail'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/:id' element={<InvoiceDetail />}/>
    </Routes>
  )
}

export default App
