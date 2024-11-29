import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./cardPlayers.module.css";
import { Flex, Avatar, Box, Text, Badge } from "@chakra-ui/react";


const CardPlayers = player => {

    const images = [
        'https://st2.depositphotos.com/3310833/7828/v/600/depositphotos_78289624-stock-illustration-flat-hipster-character.jpg',
        'https://st2.depositphotos.com/1006318/9026/v/600/depositphotos_90265702-stock-illustration-profile-icon-male-avatar-man.jpg',
        'https://static.vecteezy.com/ti/vetor-gratis/p3/4819319-avatar-cartoon-de-icone-perfil-homem-barba-sorridente-vetor.jpg'
    ];

    const rand = Math.floor(Math.random()*images.length);

    const { name, lastName, username, city, elo } = player;

    return (
        <Flex __css={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            background: '#111825',
            width: '350px',
            boxShadow: '0 2px 15px rgba(0, 0, 0, .25)',
            height: '73px',
            padding: '0 1em',
            margin: '15px 0',
            borderRadius: '34px',
            transition: 'all 600ms',
            cursor: ''
        }}

        _hover={{
            background: '#222833',
        }}
        >
            <Avatar src={images[rand]} />
            <Box ml='3'>
                <Text fontWeight='bold' color='white' style={{ textTransform: 'capitalize' }}>
                    { name + ' ' + lastName }
                </Text>
                <Text color='#128DFF' fontSize='sm' >{ elo }</Text>
            </Box>
        </Flex>
    );

}
export default CardPlayers;
