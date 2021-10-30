import './App.css';
import React,{useEffect} from 'react'
import Attachment from './components/Attachment'
import {UserProvider} from './context/UserContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Link
} from "react-router-dom";
function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);
  return props.children
}
function App() {
  return (
    
      <div className="App">     
      <Router>
      <UserProvider>
      <Switch>
        
        <_ScrollToTop>
          <Route path="/" exact>
         <Attachment />
          
        </Route>
        
        </_ScrollToTop>
        
    </Switch>
    </UserProvider>
      </Router>
      
    </div>
    
  );
}

export default App;
