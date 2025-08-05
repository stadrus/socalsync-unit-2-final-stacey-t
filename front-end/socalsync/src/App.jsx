import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Header from './components/page component/Header'
import Footer from './components/page component/Footer'
import Home from './components/page component/Home'
import About from './components/page component/About'
import Register from './components/user component/Register'
import Login from './components/user component/Login'
import Dashboard from './components/user component/Dashboard'
import EventTable from './components/event component/EventTable'
import Chat from './components/cometchat_component/Chat'
import "./components/cometchat_component/cometchat";
import { UserContext } from './context/UserContext'
import './App.css'
import { useContext} from 'react'


function App() {

 const { user } = useContext(UserContext);
  
  return (
    <>
      <BrowserRouter>
        <Header />
      <div>
        <Routes>
          <Route path ='/' element={<Home />}/>
          <Route path ='/Home' element={<Home />}/>
          <Route path ='/About' element={<About />}/>
          <Route path='/Register' element={<Register />}/>
          <Route path='/Login' element={ user ? <Navigate to= '/Dashboard' /> : <Login />}/>
          <Route path='/Dashboard' element={ user ? <Dashboard /> : <Navigate to= '/Login' />} />
          <Route path='/EventList' element={<EventTable />}/>
          <Route path='/Chat' element={<Chat />}></Route>
        </Routes>
      </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App