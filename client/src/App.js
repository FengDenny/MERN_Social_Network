import "./App.css";
import "./index.css";
import "./css/mediaQueries.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Activate from "./pages/Signup/AccountActivation";
import SubscriberRoute from "./pages/Subscriber/SubscriberRoute";
import Subscriber from "./pages/Subscriber/Subscriber";
import AdminRoute from "./pages/Admin/AdminRoute";
import Admin from "./pages/Admin/Admin";
import Navbar from "./utility/Navbar/Navbar";
import Feeds from "./pages/Feeds/Feeds";
import Footer from "./utility/Footer/Footer";
import Modal from "./utility/Modal/Modal";

function App() {
  return (
    <Router>
      <div className='App '>
        <div className='App-content'>
          <Route path='/feeds' component={Navbar} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/auth/activate/:token' component={Activate} />
            <Route exact path='/feeds' component={Feeds} />
            {/* Private/protected */}
            <SubscriberRoute exact path='/subscriber' component={Subscriber} />
            <AdminRoute exact path='/admin' component={Admin} />
          </Switch>
        </div>
        <Route path='/' component={Modal} />
        <Route path='/' component={Footer} />
      </div>
    </Router>
  );
}

export default App;
