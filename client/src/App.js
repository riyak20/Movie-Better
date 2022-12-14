import React, { useState, useEffect} from "react";
import { Route, Routes} from "react-router-dom";
import DataVisPage from "./Components/DataVis/datavispage";
import SearchPage from "./Pages/SearchPage";
import SearchPage2 from "./Pages/SearchPage2";
import HomePage from "./Components/Home/home";
import BettingPage from "./Components/Betting/BettingPage";
import AccountPage from "./Components/Accounts/AccountPage";
import Register from "./Components/NewLogin/Register";
import Login from "./Components/NewLogin/Login";
import Bettors from "./Components/Bettors/BettorPage";
import { Link } from "react-router-dom";
import { UserContext } from './UserContext';
import "./Public/Styles/index.css"
import "./Public/Styles/widget.css"
import "./Public/Styles/general.css"




function App  () {
    const[user, setUser] = useState();

   useEffect(() => {
    if(JSON.parse(localStorage.getItem("user"))){
        setUser(JSON.parse(localStorage.getItem("user")))
    } else{
        setUser(null)
    }
    console.log('userchange', user);
  }, [])
  

  //This button is on our navbar, if a user is logged in it will say logout
  //And vice versa

   const Themedbutton=()=>{
    if(!user){
        return(
            <Link to="/register" className="custom-btn btn amber black-text">
                        Login/Register </Link>
        )
    }
    else if(user){
        console.log("logout")
        return(
            <button className = "custom-btn btn red black-text" 
                            onClick = {handleLogout}
                        > Logout
                           </button>
        )
    }
}

//Tells a user who they are logged in as so that they can easily remember 
//If they are signed in 
const Profile=()=>{
    if(user){
        return(
            <li><a href="/accounts"> Signed in as: {user.username} </a></li>
        )
    }
}

//Logout of the website
const handleLogout = () => {
    localStorage.clear();
    setUser(null)
    console.log(user)
  };


    return (
        //Our navbar components
        <div>
        <UserContext.Provider value={[user, setUser]}>
            <nav className="nav-center z-depth-0" role="navigation" style = {{"backgroundColor":"aliceblue"}}>
                <div className="center-align nav-wrapper container">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/search">Encyclopedia</a></li>
                        {/* <li><a href="/search2">New Search</a></li> */}
                        <li><a href="/betting">Betting</a></li>
                        <li><a href="/datavis">DataVis</a></li>
                        <li><a href="/accounts">Account</a></li>
                        <li><a href="/bettors">Bettors</a></li>
                          <Themedbutton></Themedbutton>
                        <Profile></Profile>
                    </ul>
                </div>
            </nav>

            <Routes>
                <Route exact path = "/" element = {<HomePage/>}/>
                <Route exact path = "/betting" element = {<BettingPage/>} />
                <Route exact path = "/search" element = {<SearchPage/>} />
                <Route exact path = "/search2" element = {<SearchPage2/>} />
                <Route exact path = "/datavis" element = {<DataVisPage/>}/>
                <Route exact path = "/accounts" element = {<AccountPage/>}/>
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/bettors" element={<Bettors/>} />
            </Routes>
            </UserContext.Provider>
        </div>
    );
   };
   


export default App;