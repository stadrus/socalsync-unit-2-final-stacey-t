import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Header from './component/page component/Header'
import Footer from './component/page component/Footer'
import Home from './component/page component/Home'
import About from './component/page component/About'
import Register from './component/user component/Register'
import Login from './component/user component/Login'
import Dashboard from './component/user component/Dashboard'
import EventTable from './component/event component/EventTable'




function App() {
 
  return (
    <>
      <BrowserRouter>
        <Header />
      <div>
      </div>
      <div>
        <Routes>
          <Route path ='/' element={<Home />}/>
          <Route path ='/Home' element={<Home />}/>
          <Route path ='/About' element={<About />}/>
          <Route path='/Register' element={<Register />}/>
          <Route path='Login' element={<Login />}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/EventList' element={<EventTable />}></Route>
        </Routes>
      </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App