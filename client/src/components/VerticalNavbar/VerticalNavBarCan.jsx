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


import NavItem from './NavItem';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouteMatch } from 'react-router-dom';

export default function VerticalNavBarCan(){

  const { user, isLoading, logout} = useAuth0();
  const [size,setSize]=useState("small")
  console.log(useRouteMatch)
  const match = useRouteMatch()

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
        {match.path==="/fieldOwner"?<NavItem size={size} icon={TbSoccerField} title="Mis Canchas" link="/fieldOwner" active/>:<NavItem size={size} icon={TbSoccerField} title="Mis Equipos" link="/fieldOwner"/>}
        {match.path==="/complexOwner"?<NavItem size={size} icon={HiOutlineOfficeBuilding} title="Mis Complejos" link="/complexOwner" active/>:<NavItem size={size} icon={HiOutlineOfficeBuilding} title="Mis Complejos" link="/complexOwner"/>}
        {match.path==="/eventos"?<NavItem size={size} icon={FiCalendar} title="Mis Reservas" link="/eventos" active/>:<NavItem size={size} icon={FiCalendar} title="Mis Reservas" link="/eventos"/>}
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