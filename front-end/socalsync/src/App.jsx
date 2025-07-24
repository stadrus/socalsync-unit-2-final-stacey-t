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
import './components/cometchat component/cometchat'
import Chat from './components/cometchat component/Chat'
import { COMETCHAT_CONSTANTS, CometChatUIKit } from './components/cometchat component/cometchat'


function App() {
  const appSettings = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(COMETCHAT_CONSTANTS.REGION)
    .build();

    CometChatUIKit.init(COMETCHAT_CONSTANTS.APP_ID, appSettings)
      .then(() => {
        console.log("CometChat initialized")
      })
      .catch((error) =>{
        console.error("CometChat init faild", error)
      });
 
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