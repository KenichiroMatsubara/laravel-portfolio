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
import Routings from "./Routings";

function App() {
    const { userContext: { userType,id,token }, dispatcher: { setUserType, setId,setToken } } = useUserContext();
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/account/'
                    element={<Routings path="/account/" />}
                />
                <Route
                    path='/account/signin_for_engineer/'
                    element={<Routings path="/account/signin_for_engineer/" />}
                />
                <Route
                    path='/account/signin_for_company/'
                    element={<Routings path="/account/signin_for_company/" />}
                />
                <Route
                    path='/account/register_for_engineer/'
                    element={<Routings path="/account/register_for_engineer/" />}
                />
                <Route
                    path='/account/register_for_company/'
                    element={<Routings path="/account/register_for_company/" />}
                />
                <Route
                    path='/'
                    element={<Routings path="/" />}
                />
                <Route
                    path='/search/'
                    element={<Routings path="/search/" />}
                />
                <Route
                    path='/profile/:engineer_id/'
                    element={<Routings path="/profile/:engineer_id/" />}
                />
                <Route
                    path='/favorite/'
                    element={<Routings path="/favorite/" />}
                />
                <Route
                    path='/edit_home/'
                    element={<Routings path="/edit_home/" />}
                />
                <Route
                    path='/engineer/'
                    element={<Routings path="/engineer/" />}
                />
                <Route
                    path='/engineer/make_new/'
                    element={<Routings path="/engineer/make_new/" />}
                />
                <Route
                    path='/engineer/companylist/'
                    element={<Routings path="/engineer/companylist/" />}
                />
                <Route
                    path='/engineer/search/'
                    element={<Routings path="/engineer/search/" />}
                />
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
