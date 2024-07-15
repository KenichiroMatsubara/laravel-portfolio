/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */


/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import ReactDOM from "react-dom/client";
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { UserContextProvider,useUserContext } from "./UserContext";
import Profile from "./pages/Profile";
import Favorite from "./pages/Favorite";
import FEMakeNew from "./pages/FEMakeNew";
import FEHome from "./pages/FEHome";
import FESearch from "./pages/FESearch";
import EditHome from "./pages/EditHome";
import Search from "./pages/Search";
import FECompanyProfiles from "./pages/FECompanyProfiles";
import Account from "./pages/Account";
import FESignIn from "./pages/FESignIn";
import FCSignIn from "./pages/FCSignIn";
import FERegister from "./pages/FERegister";
import FCRegister from "./pages/FCRegister";

function App() {
    const { userContext: { userType,id,token }, dispatcher: { setUserType, setId,setToken } } = useUserContext();
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account/' element={<Account />} />
                <Route path='/account/signin_for_engineer/' element={<FESignIn />} />
                <Route path='/account/signin_for_company/' element={<FCSignIn />} />
                <Route path='/account/register_for_engineer' element={<FERegister />} />
                <Route path='/account/register_for_company' element={<FCRegister />} />
                <Route path='/search/' element={<Search />} />
                <Route path='/profile/:engineername' element={<Profile />} />
                <Route path='/favorite/' element={<Favorite />} />
                <Route path='/edit_home/' element={<EditHome />} />
                <Route path='/engineer/' element={<FEHome />} />
                <Route path='/engineer/make_new/' element={<FEMakeNew />} />
                <Route path='/engineer/companylist/' element={<FECompanyProfiles />} />
                <Route path='/engineer/search/' element={<FESearch />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
    <React.StrictMode>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </React.StrictMode>
);
