import React,{useState} from 'react';
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
}from "@chakra-ui/react"

import{
  FiMenu,
  FiHome,
  FiUsers,
  FiUser,
  FiCalendar,
  FiLogOut,
}from "react-icons/fi"
import{
    TbSoccerField
}from "react-icons/tb"
import{
    HiOutlineOfficeBuilding
}from "react-icons/hi"

import { MdSportsTennis } from "react-icons/md";

import NavItem from './NavItem';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouteMatch } from 'react-router-dom';
import { useEffect } from 'react';
import { getGamesOwner } from '../../redux/OwnerGames/ownerGamesAction';
import { getOwner } from '../../redux/GetOwner/getOwnerAction';
import {useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function VerticalNavBarCan(){
  const { user, isLoading, logout} = useAuth0();
  const [size,setSize]=useState("small")
  
  const match = useRouteMatch()
  let owner = useSelector((state) => state.getOwnerReducer.owner)
  console.log('soy owner :) ', owner)




  return(
    <Flex
    backgroundColor="#111825"
    pos="sticky"
    left="0"
    h="100vh"
    top="0"
    boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
    borderRadius={size=="small"? "0 5px 5px 0":"0 10px 10px 0"}
    w={size=="small"?"75px":"210px"}
    transition="all 0.3s ease"
    flexDir="column"
    justifyContent="space-between"
    >
      <Flex
      p="5%"
      flexDir="column"
      alignItems={size=="small"?"center":"flex-start"}
      as="nav"
      >
        <IconButton
        background="none"
        mt={5}
        color="white"
        _hover={{background:"none"}}
        icon={<FiMenu/>}
        onClick={()=>{
          if (size=="small"){
            setSize("large")
          }else{
            setSize("small")
          }
        }}
        />
        
  
        {match.path==="/"?<NavItem size={size} icon={FiHome} title="Inicio" link="/" active/>:<NavItem size={size} icon={FiHome} link="/" title="Inicio"/>}
        {match.path==="/fieldOwner"? <Link to="/owner/createComplex"> <button active>Crear Complejo</button> </Link>: <Link to="/owner/createComplex"> <button></button></Link>}
        {match.path==="/complexOwner"?<button size={size} icon={TbSoccerField} title="Crear Canchas" link="/owner/select" active/>:<button size={size} icon={TbSoccerField} title="Crear Canchas" link="/owner/select"/>}
        {match.path==="/suppliesOwner"?<NavItem size={size} icon={MdSportsTennis} title="Crear Elemento" link="/owner/createSupplie" active/>:<NavItem size={size} icon={MdSportsTennis} title="Crear Elemento" link="/owner/createSupplie"/>}
        {match.path==="/ownerBookedGames"?<NavItem size={size} icon={FiCalendar} title="Mis Turnos" link="/ownerBookedGames" active/>:<NavItem size={size} icon={FiCalendar} title="Mis Turnos" link="/ownerBookedGames"/>}
        {match.path==="/profile"?<NavItem size={size} icon={FiUser} title="Mi Perfil" link="/profile" active/>:<NavItem size={size} icon={FiUser} title="Mi Perfil" link="/profile"/>}


      </Flex>

      <Flex
      p="5%"
      flexDir="column"
      w="100%"
      alignItems={size=="small"?"center":"flex-start"}
      mb={4}
      >
        <Divider display={size=="small"?"none":"flex"}/>
        <Flex mt={4} align="center">
          <Avatar size="sm" src={user?.picture}/>
          <Flex
          flexDir="column"
          ml={4}
          display={size=="small"?"none":"flex"}
          >
            <Heading as="h3" color="white" size="sm">{user?.given_name} {user?.family_name}</Heading>
            <Text color="gray">{user?.['https://example.com/rol']}</Text>
          </Flex>
          <IconButton
            background="none"
            _hover={{background:"#00B83F"}}
            display={size=="small"?"none":"flex"}
            icon={<FiLogOut/>}
            color="white"
            onClick={()=>{
              logout({ returnTo: window.location.origin })
            }}
          />
        </Flex>

      </Flex>

    </Flex>
  )
}