import React from 'react';
import { withTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import './components/AuthorizationComponent';
import { logIn, signUp } from './components/AuthorizationComponent';
import HomePage from './components/HomePage';
import ImageUploadComponent from './components/ImageUploadComponent';
import NavBarComponent from './components/NavBarComponent';
import ProfilePage from './components/ProfilePage';
import AuthPage from './pages/AuthPage';
import LogoutPage from './utils/logout';



class App extends React.Component<any> {
    render() {

        const { t } = this.props;
        return (

            <Router>
                
                {/*{ !checkLoginToken() ? <Redirect to="/login" /> : null}
                { checkLoginToken() ? <Redirect from="/login" to='/' /> : null}
        { checkLoginToken() ? <Redirect from="/signup" to='/' /> : null}*/}

                <NavBarComponent></NavBarComponent>
                
                <Route exact path="/signup" ><AuthPage authType={signUp} /></Route>
                <Route exact path="/login" ><AuthPage authType={logIn} /></Route>
                <Route exact path="/logout" ><LogoutPage/></Route>
  
                <Route path="/profile/:userName" component={ProfilePage}/>
                <Route exact path="/profile" component={ProfilePage}/>
                <Route exact path="/" ><HomePage/></Route>
                

            </Router>
        );
    }
}

export default withTranslation()(App);
