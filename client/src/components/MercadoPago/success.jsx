import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react';
import { updateGame, sendInvitation } from '../../redux/Games/gamesAction';
import { putGame } from '../../redux/GamesIncomplete/gamesIncompleteActions';
import { Link } from 'react-router-dom';
import VerticalNavbar from '../VerticalNavbar/VerticalNavbar'
import { Button,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Heading,
  SimpleGrid,
  Center,
  Flex
   } from '@chakra-ui/react'

const Success = ({ match }) => {

  const dispatch = useDispatch()
  const id = match.params.id;
  const { user, isLoading } = useAuth0();
  const valores = window.location.search;
  const urlParams = new URLSearchParams(valores);
  let status = urlParams.get('status');

  const [ data, setData] = useState({
    to:'',
    subject:'',
    text: '',
    html: ''
  })
   console.log(data, "esto es data")

  useEffect(() => {

    if (status === "approved") {
      dispatch(updateGame(id, { status: "booked" }))
      if (!isLoading) {
        dispatch(putGame(id, { email: user.email }));
      }
    } else {
      dispatch(updateGame(id, { status: "free" }))
    }
  }, [dispatch, isLoading]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
      subject: "te a invitado su partido",
      text: "Falta Uno App",
      html: "<strong>Hola, puedes unirte al partido siguiendo este link https://falta-uno-henry.vercel.app/games/gamesIncomplete</strong>"
    })
    dispatch(sendInvitation(data))
  }


  return (
    <Flex>
      <VerticalNavbar />
      {
        isLoading ?
          <p>Cargando....</p>
          :
          status === 'approved' 
          ? null
          :null
      }
      <SimpleGrid w="100vw" flexDir="">    
        <Heading className='text-white' size='lg' fontSize='45px' >
          Tu pago se realizo con exito!
        </Heading> 
        <Heading className='text-white' as='h4' size='md'>
          Para finalizar tu reserva invita a tus amigos: 
        </Heading>

        <FormControl >
          <FormLabel className='text-white'>Email address</FormLabel>
            <Input  name= "to"  onChange={e => handleSubmit(e)}/>
          <FormHelperText>We'll never share your email.</FormHelperText>
          <Button colorScheme='whatsapp' variant='solid' type='submit' onClick={(e)=> handleSubmit(e)}>
            Send Invitation
          </Button>
        </FormControl>
      </SimpleGrid>

      <Link to='/'>
        <Button colorScheme='whatsapp' size='lg' >
          Volver al Inicio
      </Button>
      </Link>
    </Flex>
  )
}

export default Success