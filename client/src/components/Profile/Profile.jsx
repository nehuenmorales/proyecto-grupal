import React, { useEffect, useState } from 'react';
import VerticalNavbar from '../VerticalNavbar/VerticalNavbar';
import { useDispatch, useSelector } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react";
import { getPlayersProfile } from '../../redux/Players/GetPlayersAction';
import ProfileData from './profilePage';






export default function PlayerProfile() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    
    console.log(user)
    
        return (
         isLoading ? null :
        <div >
            <VerticalNavbar/>
            <ProfileData email={user.email} user={user}/>
            
        </div>
        )   
    
}

