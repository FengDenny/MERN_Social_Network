import "./App.css";
import "./index.css";
import "./css/mediaQueries.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthHome from "./pages/AuthHome/AuthHome";
import UserHome from "./pages/UserHome/UsersHome";
import Activate from "./pages/Signup/AccountActivation";
import AuthRoute from "./pages/AuthHome/AuthRoute";
import Profile from "./pages/Profile/Profile";
import Navbar from "./utility/Navbar/Navbar";
import Footer from "./utility/Footer/Footer";
import Modal from "./utility/Modal/Modal";

function App() {
  return (
    <Router>
      <div className='App '>
        <div className='App-content'>
          <Route path='/user' component={Navbar} />
          <Switch>
            <Route exact path='/' component={AuthHome} />
            <Route exact path='/user' component={UserHome} />
            <Route exact path='/auth/activate/:token' component={Activate} />
            {/* Private/protected */}
            <AuthRoute
              exact
              path='/user/profile-setting/:id'
              component={Profile}
            />
          </Switch>
        </div>
        <Route path='/' component={Modal} />
        <Route path='/' component={Footer} />
      </div>
    </Router>
  );
}

export default App;
