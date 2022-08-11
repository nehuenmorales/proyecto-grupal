import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react';
import { updateGame, sendInvitation } from '../../redux/NuevoGames/gamesAction';
import { putGame } from '../../redux/GamesIncomplete/gamesIncompleteActions';
import { Link } from 'react-router-dom';
import VerticalNavbar from '../VerticalNavbar/VerticalNavbar'
import { useToast } from '@chakra-ui/react'
import {
  Button,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Heading,
  SimpleGrid,
  Center,
  Flex,
  Text
} from '@chakra-ui/react';
import { Container, Row } from "react-bootstrap";
import { FiArrowLeft, FiHome, FiSend } from "react-icons/fi"

const Success = ({ match }) => {

  const dispatch = useDispatch()
  const id = match.params.id;
  const { user, isLoading } = useAuth0();
  const valores = window.location.search;
  const urlParams = new URLSearchParams(valores);
  let status = urlParams.get('status');
  const toast = useToast()

  const [mail, setMail] = useState("")

  const [data, setData] = useState({
    to: '',
    subject: '',
    text: '',
    html: ''
  })
  console.log(data, "esto es data")

  useEffect(() => {

    if (status === "approved") {
      dispatch(updateGame(id, { status: "booked" }))
      if (!isLoading) {
        dispatch(putGame(id, { email: user?.email }));
      }
    } else {
      dispatch(updateGame(id, { status: "free" }))
    }
  }, [dispatch, isLoading]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setMail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      to: mail,
      subject: `${user.email}te a invitado su partido`,
      text: "Falta Uno App",
      html: `<strong>Hola, puedes unirte al partido siguiendo este link https://falta-uno-henry.vercel.app/games/gamesIncomplete/${id}</strong>`
    }
    dispatch(sendInvitation(data))
    toast({
      title: 'Email enviado correctamente',
      status: 'success',
      duration: 9000,
      isClosable: true,
  })
  setMail("")

  }


  return (
    <Flex >
      <VerticalNavbar />
      <Container className='p-4' fluid>
        <Link to='/'>
          <Button __css={{ backgroundColor: '#128DFF', border: 'none', padding: '.6em 1em',borderRadius: '11px', color: 'white', transition: 'all 400ms', marginLeft: '1.5em' }} _hover={{ backgroundColor: 'rgba(18,141,255, .6)' }} size='md' rightIcon={<FiHome/>}>
            Volver al Inicio
          </Button>
        </Link>
        <Row className='m-3'>
          <Heading className='text-white' size='lg' fontSize='45px' >
            Tu pago se realizo con exito!
          </Heading>
          <Text color='#128DFF' fontSize='2xl' className='mt-3' >
            Invita a tus amigos al partido!
          </Text>
          <FormControl >
            <FormLabel className='text-white'>Email</FormLabel>
            <Input className='text-white' w='500px' variant='filled' placeholder='Ingrese el email de un jugador...' onChange={(e) => handleOnChange(e)} />
            <FormHelperText>Nunca compartiremos su correo electrónico.</FormHelperText>
            <Button className='mt-3' colorScheme='whatsapp' variant='solid' type='submit' onClick={(e) => handleSubmit(e)} rightIcon={<FiSend/>}>
              Enviar Invitacion
            </Button>
          </FormControl>
        </Row>

      </Container>
      {
        isLoading ?
          <p>Cargando....</p>
          :
          status === 'approved'
            ? null
            : null
      }
      {/* <SimpleGrid w="60vw" p='8' flexDir="">
        <Heading className='text-white' size='lg' fontSize='45px' >
          Tu pago se realizo con exito!
        </Heading>
        <Heading className='text-white' as='h4' size='md'>
          Para finalizar tu reserva invita a tus amigos:
        </Heading>
        <FormControl >
          <FormLabel className='text-white'>Email</FormLabel>
          <Input onChange={(e) => handleOnChange(e)} />
          <FormHelperText>Nunca compartiremos su correo electrónico.</FormHelperText>
          <Button colorScheme='whatsapp' variant='solid' type='submit' onClick={(e) => handleSubmit(e)}>
            Enviar Invitacion
          </Button>
        </FormControl>
      </SimpleGrid> */}
    </Flex>
  )
}

export default Success