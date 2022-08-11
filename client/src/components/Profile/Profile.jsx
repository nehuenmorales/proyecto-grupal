import React, { useEffect, useState } from 'react';
import VerticalNavbar from '../VerticalNavbar/VerticalNavbar';
import { useDispatch, useSelector } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react";
import { getPlayersProfile } from '../../redux/Players/GetPlayersAction';
import ProfileData from './profilePage';
import {Flex} from "@chakra-ui/react"
import VerticalNavBarCan from '../VerticalNavbar/VerticalNavBarCan';
import OwnerProfile from './ownerProfile/ownerProfile';

export default function PlayerProfile() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    
        return (
         isLoading ? null :
         <div>
        
            {user['https://example.com/rol'] === 'owner' ?
            <Flex>
            <VerticalNavBarCan /> 
            <OwnerProfile/>
            </Flex>
            :
            <Flex>
            <VerticalNavbar/>
            <ProfileData email={user.email} user={user}/>
            </Flex>
            }
         </div>   
            
        
        )   
    
}

