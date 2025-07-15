import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Header from '../../../front-end/socalsync/src/components/page component/Header'
import Footer from '../../../front-end/socalsync/src/components/page component/Footer'
import Home from '../../../front-end/socalsync/src/components/page component/Home'
import About from '../../../front-end/socalsync/src/components/page component/About'
import Register from '../src/components/user component/Register'
import Login from '../src/components/user component/Login'
import Dashboard from '../src/components/user component/Dashboard'
import EventTable from '../src/components/event component/EventTable'




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