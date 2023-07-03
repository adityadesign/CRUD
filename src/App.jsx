import Navbar from './component/Navbar'
import Create from './component/Create'
import Read from './component/Read'
import { Route, Routes } from 'react-router-dom'
import Update from './component/Update'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Create />}/>
        <Route path='/read' element={<Read />}/>
        <Route path='/edit/:id' element={<Update />}/>
      </Routes>
    </>
  )
}

export default App
