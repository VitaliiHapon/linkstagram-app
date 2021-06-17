import React from 'react';
import { withTranslation } from 'react-i18next';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import './App.css';
import './components/AuthorizationComponent';
import { logIn, signUp } from './components/AuthorizationComponent';
import AvatarIcon from './components/AvatarIcon';
import DropDownSelect from './components/DropDownSelect';
import HomePage from './components/HomePage';
import NavBarComponent from './components/NavBarComponent';
import ProfileInfo from './components/ProfileInfoComponent';
import ProfilePage from './components/ProfilePage';
import AuthPage from './pages/AuthPage';
import { deleteLoginToken } from './utils/auth'
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
                <Route exact path="/avatar" ><AvatarIcon size={32} active={false} imageUrl={"https://images.unsplash.com/photo-1554080353-a576cf803bda?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"} /></Route>
                <Route exact path="/logout" ><LogoutPage/></Route>
                <Route path="/profile/:userName" component={ProfilePage}/>
                <Route exact path="/profile" ><ProfileInfo/></Route>
                <Route exact path="/" ><HomePage/></Route>
                

            </Router>
        );
    }
}

export default withTranslation()(App);
