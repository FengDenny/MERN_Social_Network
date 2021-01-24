import "./App.css";
import "./index.css";
import "./css/mediaQueries.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Activate from "./pages/Signup/AccountActivation";
import Navbar from "./utility/Navbar/Navbar";
import Footer from "./utility/Footer/Footer";
import Modal from "./utility/Modal/Modal";

function App() {
  return (
    <Router>
      <div className='App '>
        <div className='App-content'>
          {/* <Route path='/' component={Navbar} /> */}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/auth/activate/:token' component={Activate} />
          </Switch>
        </div>
        <Route path='/' component={Modal} />
        <Route path='/' component={Footer} />
      </div>
    </Router>
  );
}

export default App;
