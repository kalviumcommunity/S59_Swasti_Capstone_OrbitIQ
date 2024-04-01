import Logo from './assets/logo.png'
import {BarLoader} from 'react-spinners'
import './App.css'

function App() {

  return (
    <div className='loading'>
      <img src={Logo} height='200px'/>
      <BarLoader color="#6FFAC9" width='200px' />
    </div>
  )
}

export default App
