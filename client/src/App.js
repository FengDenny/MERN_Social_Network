import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./utility/Navbar/Navbar";
import Footer from "./utility/Footer/Footer";

function App() {
  return (
    <Router>
      <div className='App '>
        <div className='App-content'>
          {/* <Route path='/' component={Navbar} /> */}
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
        <Route path='/' component={Footer} />
      </div>
    </Router>
  );
}

export default App;
