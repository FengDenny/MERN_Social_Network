import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./utility/Navbar/Navbar";
import Footer from "./utility/Footer/Footer";

function App() {
  return (
    <Router>
      <div className='App'>
        {/* <Route path='/' component={Navbar} /> */}
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
        {/* <Route path='/' component={Footer} /> */}
      </div>
    </Router>
  );
}

export default App;
