import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './Routes/Signin'
import { Signup } from './Routes/signup'
import { Dashboard } from './Routes/Dashboard'
import { Send } from './Routes/Send'
import { Landing } from './Routes/Landing'

function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/send' element={<Send />} />
        <Route path='/' element={<Landing/>} />
      </Routes>
    </BrowserRouter>
  </div>
}

export default App

