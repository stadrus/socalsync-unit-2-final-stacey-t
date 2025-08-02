import { BrowserRouter, Routes, Route } from 'react-router'
import Header from './components/page component/Header'
import Footer from './components/page component/Footer'
import Home from './components/page component/Home'
import About from './components/page component/About'
import Register from './components/user component/Register'
import Login from './components/user component/Login'
import Dashboard from './components/user component/Dashboard'
import EventTable from './components/event component/EventTable'
import Chat from './components/cometchat component/Chat'
import './components/cometchat component/cometchat'
import { UserProvider } from './context/UserContext'
import './App.css'


function App() {
  
  return (
    <>
    <UserProvider>
      <BrowserRouter>
        <Header />
      <div>
        <Routes>
          <Route path ='/' element={<Home />}/>
          <Route path ='/Home' element={<Home />}/>
          <Route path ='/About' element={<About />}/>
          <Route path='/Register' element={<Register />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/EventList' element={<EventTable />}/>
          <Route path='/Chat' element={<Chat />}></Route>
        </Routes>
      </div>
        <Footer />
      </BrowserRouter>
    </UserProvider>
    </>
  )
}

export default App