
import './App.css'
import { Routes, Route } from 'react-router-dom'

import OrdersPage from './pages/OrdersPage'
import MenuPage from './pages/MenuPage'
import NewSaucerPage from './pages/NewSaucerPage'
import SideBar from './components/SideBar'
import { FirebaseProvider } from './firebase/FirebaseContext'

function App() {

  return (
    <FirebaseProvider>
      <div className="md:flex min-h-screen">
        <SideBar />
        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Routes>
            <Route path="/" element={<OrdersPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/new-saucer" element={<NewSaucerPage />} />
          </Routes>
        </div>
      </div>
    </FirebaseProvider>
  )
}

export default App
