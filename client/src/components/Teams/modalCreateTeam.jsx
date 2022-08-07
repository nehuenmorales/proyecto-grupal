import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTeam, getTeamsUser } from "../../redux/Teams/teamsActions";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, DropdownButton, Form, FormGroup} from "react-bootstrap";

import axios from "axios";
import { useEffect } from "react";
import s from "./diseñoTeams/modelCreateTeam.module.css";

export function ModalCreateTeam({ email, setShowModal, showModal }) {
  let dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    sport: "",
    playerEmail: email,
    amountPlayers: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "Ingrese el nombre del equipo",
    sport: "Ingrese el deporte del equipo",
  });

  const [flagSport, setFlagSport] = useState(false);

  const validator = (e) => {
    // meter al estado y modificar a partir de ahi
    // le paso por parametro e
    let validations = {};
    const beNumber = /(^\d{1,10}$)/;
    const property = e.target.name;
    const value = e.target.value;

    if (property === "name") {
      if (!value) {
        return (validations[property] = "Ingrese el nombre del equipo");
      }
      if (value.length > 30) {
        return (validations[property] =
          "El nombre del equipo no puede tener mas de 30 caracteres");
      }
    }
    if (property === "sport") {
      if (!value) {
        return (validations[property] = "Ingrese el deporte del equipo");
      }
    }

    validations[property] = "";

    return validations[property];
  };
  const handleInputChange = (e,deporte) => {

     
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    console.log("soy name", name)
    console.log("soy value", input)

    if (name==="amountPlayers"){
      setErr("")

    }
    if (name === "sport") {
      if (deporte === "tenis") {
        setInput({ ...input, amountPlayers: 2,sport:"tenis"});
        setFlagSport(false);
        setErr("")
        setErrors({ ...errors, [name]: "" });
        return;
      }
      if (deporte === "padel") {

        setInput({ ...input, amountPlayers: 2,sport:"padel"});
        setFlagSport(false);
        setErr("")
        setErrors({ ...errors, [name]: "" });        
        return;
      }

      if (deporte === "basquet") {
        setInput({ ...input, amountPlayers: 5,sport:"basquet" });
        setErr("")
        setFlagSport(false);
        setErrors({ ...errors, [name]: "" });
        return;
      } else {
        
        setInput({ ...input,sport:"futbol",amountPlayers:"" });
        setErrors({ ...errors, [name]: "" });
       

        setFlagSport(true);
        return;
      }
    }
    setInput({ ...input, [name]: value });
    

    setErrors({ ...errors, [name]: validator(e) });
  };

  const uploadImage = async (e) => {
    const form = new FormData();
    form.append("image", e.target.files[0]);
    console.log(e.target.files);
    const settings = {
      method: "POST",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form,
    };
    setLoading(true);
    // console.log("cargando..", loading);

    const respuesta = await axios(
      "https://api.imgbb.com/1/upload?expiration=600&key=12d5944c0badc6235fe12ec6550754c8",
      settings
    );

    setInput({
      ...input,
      image: respuesta.data.data.url,
    });
    setLoading(false);

    console.log("soy respuesta img", respuesta.data.data.url);
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    dispatch(createTeam(input));//para el futuro 
    console.log(input);
    setShowModal(false);
    setInput({    
      name: "",
      sport: "",
      playerEmail: email,
      amountPlayers: "",
      image: "",
    });
  };

  const volver = () => {
    setShowModal(false);
    setFlagSport(false);
    setInput({
      name: "",
      sport: "",
      playerEmail: email,
      amountPlayers: "",
      image: "",
    });
    setErrors({name: "Ingrese el nombre del equipo",
    sport: "Ingrese el deporte del equipo",
  })
  setErr("")
  };

  //---------------------- INVITACIONES A PLAYERS -------------------------
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    axios.get("https://falta-uno-1.herokuapp.com/player/getPlayers").then((resp) => {
      setPlayers(resp.data);
      console.log("respuesta de axios", resp.data);
    });
  }, []);

  const [invitations, setInvitations] = useState([]);
  const [integrantes, setIntegrantes] = useState([]);
  const [click, setClick] = useState(false);
  const [playerInput, setPlayerInput] = useState([]);
  const [inpute, setInpute] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [err, setErr] = useState("")

  const handleChangeInvite = (ev) => {
    setErr("")
    setInpute(ev.target.value);
    autocomplete(ev);
  };


  const onClickInvite = (ev) => {
    ev.preventDefault()
   if (input.amountPlayers === "") {
    setErr("debe seleccionar un deporte")
    return;
   }else if(integrantes.includes(ev.target.value) || ev.target.value === email){
      setErr("este jugador ya está invitado")
      return;
   }else if ((input.amountPlayers -1) < integrantes.length) {
      console.log("entro a aca 1")
      setErr("la cantidad de jugadores esta completa")
      return;
    } else {
      setErr("")
      setInvitations([...invitations, ev.target.value]);
      setInpute(ev.target.value);
      setPlayerInput([]);
      setClick(true);
      setInputValue("");
      setIntegrantes([...integrantes, ev.target.value]);
      console.log("entro", ev.target.value)
    }
  };
  function autocomplete(ev) {
    ev.preventDefault();
    const value = ev.target.value;
    const results = players.filter((p) => {
      return p.name.toLowerCase().startsWith(value.toLowerCase());
    });
    setPlayerInput(results);
  }

  function deleteInvitation(e) {
    
    e.preventDefault();
    const respuesta = invitations.filter((i) => i !== e.target.value);
    setInvitations(respuesta);
    setIntegrantes(respuesta);
  }

  return (
    <div >
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        // style={{"color":"rgb(20, 22, 74)"}}

      >
        {/* style={{"backgroundColor":"rgb(190, 190, 190)", "boxShadow": "2px 2px 5px #999"}} */}
        <Modal.Header   >
          <Modal.Title>
            <h2 >Creá tu Equipo</h2>
            <p>Completá los datos</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={s.flex}>
            <div className={s.columnLeft}>
              <div className={s.campo}>
                <h5 className={s.titulos}>Nombre del Equipo</h5>
                <input
                  className={s.input}
                  type="text"
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              {errors.name ? <h6 className={s.error} >{errors.name}</h6> : null}
              <div>
                <h5>Selecciona un deporte</h5>
                {/* <select name="sport" onChange={(e) => handleInputChange(e)}>
                  <option hidden selected>
                    Deporte
                  </option>
                  <option value={"futbol"} name="sport">
                    Futbol
                  </option>
                  <option value={"basquet"} name="sport">
                    Basquet
                  </option>
                  <option value={"padel"} name="sport">
                    Padel
                  </option>
                  <option value={"tenis"} name="sport">
                    Tenis
                  </option>
                </select> */}
                <div className="mb-2">
        {['down'].map((direction) => (
          <DropdownButton
            key={direction}
            id={`dropdown-button-drop-${direction}`}
            drop={direction}
            variant="secondary"
            title={`Seleccione un deporte`}
            
          >
            <Dropdown.Item   name="sport" value="futbol" onClick={(e) => {handleInputChange(e,"futbol")}} eventKey="1">Futbol</Dropdown.Item>
            <Dropdown.Item   name="sport" value="basquet" onClick={(e) => {handleInputChange(e,"basquet")}} eventKey="2">Basquet</Dropdown.Item>
            <Dropdown.Item   name="sport" value="padel" onClick={(e) => {handleInputChange(e,"padel")}} eventKey="3">Padel</Dropdown.Item>
            <Dropdown.Item   name="sport" value="tenis" onClick={(e) => {handleInputChange(e,"tenis")}} eventKey="4">Tenis</Dropdown.Item>
            {/* <Dropdown.Divider />
            <Dropdown.Item eventKey="3">Separated link</Dropdown.Item> */}
          </DropdownButton>
        ))}
      </div>
                {flagSport ? (
                  <div>
                    <h5>Tipo de juego</h5>               
                    {
                      input.amountPlayers == 11 ? 
                    <button
                    className={s.buttonTypeFVerde}
                      name="amountPlayers"
                      value={11}
                      onClick={(e) => handleInputChange(e)}
                    >
                      Futbol 11
                    </button>
                    :
                    <button
                    className={s.buttonTypeF}
                      name="amountPlayers"
                      value={11}
                      onClick={(e) => handleInputChange(e)}
                    >
                      Futbol 11
                    </button>
                    }
                    {
                      input.amountPlayers == 7 ?
                    <button
                      className={s.buttonTypeFVerde}

                      name="amountPlayers"
                      value={7}
                      onClick={(e) => handleInputChange(e)}
                    >
                      Futbol 7
                    </button>
                    :
                    <button
                      className={s.buttonTypeF}

                      name="amountPlayers"
                      value={7}
                      onClick={(e) => handleInputChange(e)}
                    >
                      Futbol 7
                    </button>
                    }
                    {
                      input.amountPlayers == 5 ?
                    <button
                    className={s.buttonTypeFVerde}
                      name="amountPlayers"
                      value={5}
                      onClick={(e) => handleInputChange(e)}
                    >
                      Futbol 5
                    </button>
                    :
                    <button
                    className={s.buttonTypeF}
                      name="amountPlayers"
                      value={5}
                      onClick={(e) => handleInputChange(e)}
                    >
                      Futbol 5
                    </button>
                    }
                  </div>
                ) : null}
                {input.amountPlayers?<h6 >{input.sport.toUpperCase()}</h6>:null}
                {input.sport === "futbol" ? (
                  !input.amountPlayers ? (
                    <h6 className={s.error} >Elija el tipo de juego</h6>
                  ) : null
                ) : null}
                {errors.sport ? <h6 className={s.error}>{errors.sport}</h6> : null}
              </div>
            </div>

            <div className={s.column}>
              <div className={s.inImage}>
                <h5>Imagen</h5>
                <input
                  className={s.inputImage}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadImage}
                />
                {loading ? <span>Cargando...</span> : null}
              </div>

              {/* SELECCIONAR PLAYERS */}
              <div>
                <form>
                  <div>
                    <h5>Integrantes</h5>
                    <input
                      className={s.input}
                      placeholder="Invita a un jugador"
                      aria-label="Invita a los jugadores"
                      aria-autocomplete="both"
                      aria-controls="autocomplete-results"
                      defaultValue={inputValue}
                      onChange={(ev) => handleChangeInvite(ev)}
                    />
                  </div>
                  <div>
                    <ul
                      id="autocomplete-results"
                      role="listbox"
                      aria-label="Search for a country"
                    >
                      {playerInput
                        ? playerInput?.map((elem, index) => {
                            return (
                              <li id={index}>
                                <button
                                  onClick={(e) => onClickInvite(e)}
                                  value={elem.email}
                                >
                                  {elem.name} {elem.lastName}
                                </button>
                              </li>
                            );
                          })
                        : null}
                      
                      {err ? <span className={s.error}>{err}</span> : null}
                    </ul>
                    <div>
                      <ul>
                        {<p className={s.nameIntegrante}>{email}</p>}
                        {integrantes
                          ? integrantes.map((e) => {
                              return (
                                <div className={s.integrante}>
                                  
                                  <h6 className={s.nameIntegrante}>{e}</h6>
                                  
                                  
                                  <button
                                  
                                  
                                  className={s.buttonClose}
                                    value={e}
                                    onClick={(e) => deleteInvitation(e)}
                                  >
                                    X
                                  </button>
                                  
                                </div>
                              );
                            })
                          : null}
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer >
          <button className="btn btn-primary" onClick={volver} variant="secondary">
            Volver
          </button>
          <div>
            {!loading &&
            !errors.name &&
            !errors.sport &&
            input.amountPlayers ? (
              <button  className="btn btn-success"  style={{color: 'white'}} type="submit" onClick={(e) => handleSubmit(e)}>
                Crear equipo
              </button>
            ) : (
              <button className="btn btn-success" style={{color: 'white'}} type="submit" disabled>
                Crear equipo
              </button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
