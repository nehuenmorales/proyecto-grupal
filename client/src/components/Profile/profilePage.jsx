import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getPlayersProfile,
  putPlayer,
} from "../../redux/Players/GetPlayersAction";
import s from "./profilePage.module.css";
import axios from "axios";
// import { Autocomplete } from "@react-google-maps/api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text
} from '@chakra-ui/react'
import { useAuth0 } from '@auth0/auth0-react';
import { useToast } from '@chakra-ui/react'


export default function ProfileData({ email, user }) {
  const mail = email;
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { logout } = useAuth0();
  const toast = useToast()

  useEffect(() => {
    dispatch(getPlayersProfile(mail));
  }, [dispatch]);

  const [cities, setCities] = useState([]);
  const [input, setInput] = useState("");
  const [click, setClick] = useState(false);
  const [cityInput, setCityInput] = useState([]);
  const [flag, setFlag] = useState(false);
  const [buttonedit, setButtonEdit] = useState({
    name: false,
    lastName: false,
    telephone: false,
    username: false,
    city: false,
  });

  const player = useSelector((state) => state.getPlayersReducer.playerProfile);
  const [profile, setChangesToProfile] = useState({
    name: player?.name,
    lastName: player?.lastName,
    telephone: player?.telephone,
    username: player?.username,
    city: player?.city,
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    telephone: "",
    username: "",
  });
  useEffect(() => {
    setChangesToProfile({
      name: player?.name,
      lastName: player?.lastName,
      telephone: player?.telephone,
      username: player?.username,
      city: player?.city,
    });
    axios.get("https://falta-uno-1.herokuapp.com/complex/getCities").then((resp) => {
      setCities(resp.data);
    });
  }, [player]);

  const validador = (e) => {
    const nameExpresion = /[0-9/'0-9'/,*+._&=():;%$#!|-]/gi;
    const phoneRegularExpresion = /^\d+$/;
    const name = e.target.name;
    const value = e.target.value;
    console.log("nombre del error", name);
    console.log("valor del error", value);

    if (name === "name" || name === "lastName") {
      if (nameExpresion.test(value) || !value) {
        setErrors({ ...errors, [name]: "Valor invalido" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
    if (name === "telephone") {
      if (!phoneRegularExpresion.test(value)) {
        setErrors({ ...errors, [name]: "Valor invalido" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
    if (name === "username") {
      if (!value) {
        setErrors({ ...errors, [name]: "Valor invalido" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setChangesToProfile({ ...profile, [name]: value });
    setFlag(true);
    validador(e);
  };

  const editProfile = (value,e) => {
    if(e){
      e.preventDefault()
    }
    if (buttonedit[value]) {
      setButtonEdit({ ...buttonedit, [value]: false });
    } else {
      setButtonEdit({ ...buttonedit, [value]: true });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(putPlayer(mail, profile));
    setFlag(false);
    setButtonEdit({
      name: false,
      lastName: false,
      telephone: false,
      username: false,
      city: false,
    });
  };

  const handleChangeCity = (ev) => {
    console.log("quesoy", ev.target.value);
    setInput(ev.target.value);
    autocomplete(ev);
  };
  const onClickCity = (ev) => {
    ev.preventDefault();
    setChangesToProfile({ ...profile, city: ev.target.value });
    setButtonEdit({ ...buttonedit, city: false });
    setFlag(true);
    setInput(ev.target.value);
    setCityInput([]);
    setClick(true);
  };

  const handleDelete = async () => {
    console.log(player?.id)
    const del = await axios.post(`https://falta-uno-1.herokuapp.com/player/delete/${player?.id}`)
    console.log(del) 
    toast({
      title: 'Tu cuenta ha sido eliminada',
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
    setTimeout(del, 2000)
    if(del) logout({ returnTo: window.location.origin })
  }


  function autocomplete(ev) {
    const value = ev.target.value;
    const results = cities.filter((city) => {
      return city.toLowerCase().startsWith(value.toLowerCase());
    });
    setCityInput(results);
  }

  return (
    <>
      {player?.name ? (
        <div>
          <div className={s.container}>
            <div>
              <img src={user?.picture} className={s.image} alt="Profile Image" />
            </div>
            <div className={s.info}>
              {buttonedit.name ? (
                <div className={s.containerData} >
                  
                  <h6>
                  Nombre:{" "}
                  </h6>
                  <input 
                    className={s.input}
                    name="name"
                    onChange={(e) => onChange(e)}
                    defaultValue={profile.name}
                  />{" "}
                  
                  <button
                    name="name"
                    onClick={(e) => editProfile("name")}
                    className={s.buttonEdit}
                  >
                   <i class="fa-solid fa-pen-to-square"></i>
                  </button>{" "}
                </div>
              ) : (
                <div className={s.containerData} >
                  
                  <h6>
                  Nombre: {profile.name}{" "}
                  </h6>
                  
                  <button
                    name="name"
                    onClick={(e) => editProfile("name")}
                    className={s.buttonEdit}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>{" "}
                </div>
              )}

              {errors.name ? <h5>{errors.name}</h5> : null}

              {buttonedit.lastName ? (
                <div className={s.containerData} >

                  <h6>
                  Apellido:{" "}
                  </h6>
                  <input 
                    className={s.input}
                    name="lastName"
                    onChange={(e) => onChange(e)}
                    defaultValue={profile.lastName}
                  />{" "}
                  
                  <button
                    name="lastName"
                    onClick={(e) => editProfile("lastName")}
                    className={s.buttonEdit}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>{" "}
                </div>
              ) : (
                <div className={s.containerData} >
                  
                  <h6>
                  Apellido: {profile.lastName}{" "}
                  </h6>
                 
                  <button
                    name="lastName"
                    onClick={(e) => editProfile("lastName")}
                    className={s.buttonEdit}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>{" "}
                </div>
              )}

              {errors.lastName ? <h5>{errors.lastName}</h5> : null}
              <div className={s.containerData}>

              <h6>Email: {player.email}</h6>
              </div>

              {buttonedit.telephone ? (
                <div className={s.containerData} >
                  
                  <h6>
                  Telefono:{" "}
                  </h6>
                  <input 
                    className={s.input}
                    name="telephone"
                    onChange={(e) => onChange(e)}
                    defaultValue={profile.telephone}
                  />{" "}
                  
                  <button
                    name="telephone"
                    onClick={(e) => editProfile("telephone")}
                    className={s.buttonEdit}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>{" "}
                </div>
              ) : (
                <div className={s.containerData} >
                  
                  <h6>
                  Telefono: {profile.telephone}{" "}
                  </h6>
                 
                  <button
                    name="telephone"
                    onClick={(e) => editProfile("telephone")}
                    className={s.buttonEdit}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>{" "}
                </div>
              )}

              {errors.telephone ? <h5>{errors.telephone}</h5> : null}

              {buttonedit.username ? (
                <div className={s.containerData} >
                  
                  <h6>
                  Nombre de usuario:{" "}
                  </h6>
                  
                  <input 
                    className={s.input}
                    name="username"
                    onChange={(e) => onChange(e)}
                    defaultValue={profile.username}
                  />{" "}
                  <button
                  style={{backgroundColor: 'white'}}
                    name="username"
                    onClick={(e) => editProfile("username")}
                    className={s.buttonEdit}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>{" "}
                </div>
              ) : (
                <div className={s.containerData} >
                  
                  <h6>
                  Nombre de usuario: {profile.username}{" "}
                  </h6>
                 
                  <button
                    name="username"
                    onClick={(e) => editProfile("username")}
                    className={s.buttonEdit}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>{" "}
                </div>
              )}

              {errors.username ? <h5>{errors.username}</h5> : null}

              {
                buttonedit.city ? (
                  <div >
                    <form>
                      <div className={s.containerData}>
                      <h6>
                        Ciudad:
                        <input 
                          className={s.input}
                          placeholder="Selecciona tu ciudad"
                          aria-label="Selecciona tu ciudad"
                          aria-autocomplete="both"
                          aria-controls="autocomplete-results"
                          defaultValue={profile.city}
                          onChange={(ev) => handleChangeCity(ev)}
                        />
                      </h6>
                      {/* <button
                                 type='submit'
                                 aria-label='Search'
                                 >
                                 <svg viewBox='0 0 24 24'>
                                 <path d='M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z' />
                                 </svg>
                                </button> */}
                      <button
                        value="city"
                        onClick={(e) => editProfile("city",e)}
                        className={s.buttonEdit}
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      </div>
                      <div>
                        <ul
                          id="autocomplete-results"
                          role="listbox"
                          aria-label="Search for a country"
                        >
                          {cityInput
                            ? cityInput?.map((elem, index) => {
                                return (
                                  <li id={index}>
                                    <button
                                      onClick={(e) => onClickCity(e)}
                                      value={elem}
                                    >
                                      {elem}
                                    </button>
                                  </li>
                                );
                              })
                            : null}
                          {!click ? (
                            <div>Debes seleccionar una ciudad</div>
                          ) : null}
                        </ul>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className={s.containerData}>
                  <h6>
                    Ciudad: {profile.city}
                  </h6>
                    <button
                      value="city"
                      onClick={(e) => editProfile("city")}
                      className={s.buttonEdit}
                    >
                    <i class="fa-solid fa-pen-to-square"></i>

                    </button>{" "}
                  </div>
                )
                // <h6>Ciudad: {profile.city} <button value="city" onClick={(e)=>editProfile(e.target.value)}>X</button> </h6>
              }
              <div className={s.containerData}>
              
                <h6>Elo: {player.elo}</h6>
              </div>

              {flag &&
              !errors.name &&
              !errors.lastName &&
              !errors.telephone &&
              !errors.username ? (
                <div className={s.containerButtonFinal}>

                <button className={s.buttonfinal} onClick={(e) => onSubmit(e)}>
                  Guardar cambios al usuario
                </button>
                </div>
              ) : null}
              {/* // aca voy a romper todo */}
              <div style={{display: 'flex', width: '100%', justifiContent: 'flex-end'}}>
              <Button style={{marginTop: '60px', marginLeft:'150px', backgroundColor:'rgb(176, 6, 18)', color:'white', width: '500px'}} onClick={onOpen}>Eliminar Cuenta</Button>
              </div>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Eliminar mi Usuario</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text noOfLines={[1, 2, 3]}>
                      La eliminacion de la cuenta es definitiva,
                      tu perfil, tus datos y tu historial se eliminaran definitivamente.
                      ¿Quieres eliminar tu usuario?
                    </Text>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                      Volver
                    </Button>
                    <Button variant='ghost' onClick={e => handleDelete(e)}>Eliminar Cuenta</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              {/* aca les rompi todo */}

            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
