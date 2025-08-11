import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/page component/Header'
import Footer from './components/page component/Footer'
import Home from './components/page component/Home'
import About from './components/page component/About'
import Register from './components/user component/Register'
import Login from './components/user component/Login'
import Dashboard from './components/user component/Dashboard'
import EventTable from './components/event component/EventTable'
import Chat from './components/cometchat_component/Chat'
import "./components/cometchat_component/CometChatSetup";
import { UserContext } from './context/UserContext'
import './App.css'
import { useContext} from 'react'
import CometChatApp from './components/cometchat_component/CometChatApp'

function App() {

 const { user } = useContext(UserContext);
  
  return (
    <>
    <div className='app-container'>
    <header>
        <Header />
    </header>
      <div className='main-content'>
        <Routes>
          <Route path ='/' element={<Home />}/>
          <Route path ='/Home' element={<Home />}/>
          <Route path ='/About' element={<About />}/>
          <Route path='/Register' element={<Register />}/>
          <Route path='/Login' element={ user ? <Navigate to= '/Dashboard' /> : <Login />}/>
          <Route path='/Dashboard' element={ user ? <Dashboard /> : <Navigate to= '/Login' />} />
          <Route path='/EventList' element={<EventTable />}/>
          <Route path='/Chat' element={ user ? <Chat /> : <Navigate to='/Login' />}></Route>
          <Route path='/CometChatApp' element={user ? <CometChatApp /> : <Navigate to='/Login' /> }></Route>
        </Routes>
      </div>
      <footer>
        <Footer />
      </footer>
        </div>
    </>
  )
}

export default App