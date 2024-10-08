import React, { FC } from 'react'
import { useUserContext } from './UserContext';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from "./pages/Profile";
import Favorite from "./pages/Favorite";
import FEMakeNew from "./pages/FEMakeNew";
import FEHome from "./pages/FEHome";
import FESearch from "./pages/FESearch";
import EditHome from "./pages/EditHome";
import Search from "./pages/Search";
import Account from "./pages/Account";
import FESignIn from "./pages/FESignIn";
import FCSignIn from "./pages/FCSignIn";
import FERegister from "./pages/FERegister";
import FCRegister from "./pages/FCRegister";
import FEEditProduct from './components/FEEditProduct';
import FEEditProfile from './pages/FEEditProfile';
import FEFavorite from './pages/FEFavorite';

const Routings: FC<{path:string}> = ({path}) => {
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();



    if(path==='/account/'){
        if(state==='signin' && id!==-1){
            if(userType==='company'){
                return (
                    <Navigate to={`/`} />
                );
            }
            else if(userType==='engineer'){
                return (
                    <Navigate to={`/engineer/`} />
                );
            }
        }
        else {
            return (
                <Account />
            );
        }
    }


    else if(path==='/account/signin_for_engineer/'){
        if(state==="signin" && id!==-1 && userType==="engineer"){
            return (
                <Navigate to={`/engineer/`} />
            );
        }
        else{
            return (
                <FESignIn />
            )
        }
    }


    else if(path==='/account/register_for_engineer/'){
        if(state==="signin" && id!==-1 && userType==="engineer"){
            return (
                <Navigate to={`/engineer/`} />
            );
        }
        else{
            return (
                <FERegister />
            )
        }
    }


    else if(path==='/account/signin_for_company/'){
        if(state==="signin" && id!==-1 && userType==="company"){
            return (
                <Navigate to={`/`} />
            );
        }
        else{
            return (
                <FCSignIn />
            )
        }
    }


    else if(path==='/account/register_for_company/'){
        if(state==="signin" && id!==-1 && userType==="company"){
            return (
                <Navigate to={`/`} />
            );
        }
        else{
            return (
                <FCRegister />
            )
        }
    }


    // Company系列のページのルーティング
    else if(path==='/'){
        if(state==="signin" && id!==-1 && userType==="company"){
            return(
                <Home />
            )
        }
        else if(state==="signout"){
            return (
                <Navigate to={`/account/`} />
            );
        }
    }

    else if(path==='/search/'){
        if(state==="signin" && id!==-1 && userType==="company"){
            return(
                <Search />
            )
        }
        else if(state==="signout"){
            return (
                <Navigate to={`/account/signin_for_company/`} />
            );
        }
    }


    else if(path==='/profile/:engineer_id/'){
        if(state==="signin" && id!==-1 && userType==="company"){
            return(
                <Profile />
            )
        }
        else if(state==="signout"){
            return (
                <Navigate to={`/account/signin_for_company/`} />
            );
        }
    }


    else if(path==='/favorite/'){
        if(state==="signin" && id!==-1 && userType==="company"){
            return(
                <Favorite />
            )
        }
        else if(state==="signout"){
            return (
                <Navigate to={`/account/signin_for_company/`} />
            );
        }
    }


    else if(path==='/edit_home/'){
        if(state==="signin" && id!==-1 && userType==="company"){
            return(
                <EditHome />
            )
        }
        else if(state==="signout"){
            return (
                <Navigate to={`/account/signin_for_company/`} />
            );
        }
    }

    // ここからエンジニアサイドのルーティング
    else if(path=='/engineer/'){
        if(state==="signin" && id!==-1 && userType==="engineer"){
            return (
                <FEHome />
            )
        }
        else if(state==="signout"){
            return <Navigate to={`/account/signin_for_engineer/`} />
        }
    }


    else if(path==='/engineer/make_new/'){
        if(state==="signin" && id!==-1 && userType==="engineer"){
            return(
                <FEMakeNew />
            )
        }
        else if(state==="signout"){
            return (
                <Navigate to={`/account/signin_for_engineer/`} />
            );
        }
    }


    else if(path==='/engineer/favorite/'){
        if(state==="signin" && id!==-1 && userType==="engineer"){
            return(
                <FEFavorite />
            )
        }
        else if(state==="signout"){
            return (
                <Navigate to={`/account/signin_for_engineer/`} />
            );
        }
    }


    else if(path==='/engineer/search/'){
        if(state==="signin" && id!==-1 && userType==="engineer"){
            return(
                <FESearch />
            )
        }
        else if(state==="signout"){
            return (
                <Navigate to={`/account/signin_for_engineer/`} />
            );
        }
    }

    else if(path==="/engineer/edit_portfolio/:productId/"){
        if(state==="signin" && id!==-1 && userType==="engineer"){
            return(
                <FEEditProduct />
            )
        }
        else if(state==="signout"){
            return (
                <Navigate to={`/account/signin_for_engineer/`} />
            );
        }
    }

    else if(path==="/engineer/edit_profile/"){
        if(state==="signin" && id!==-1 && userType==="engineer"){
            return(
                <FEEditProfile />
            )
        }
        else if(state==="signout"){
            return (
                <Navigate to={`/account/signin_for_engineer/`} />
            );
        }
    }


    else {
        <>
        <p>404</p>
        <p>not found this page</p>
        </>
    }
}

export default Routings
