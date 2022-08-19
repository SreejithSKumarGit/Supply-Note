
import './App.css';
import { Home } from './Pages/Home Page/Home';

import {Route,Routes} from "react-router-dom";
import { Shortner } from './Pages/Shortner Page/Shortner';
import { Redirect } from './Pages/Redirect Page/Redirect';
function App() {
  return (
    
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/shortner' element={<Shortner/>}/>
      <Route path='/:short' element={<Redirect/>}/>
    </Routes>
    
  );
}

export default App;
