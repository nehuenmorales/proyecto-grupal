import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTeam, getTeamsUser } from "../../redux/Teams/teamsActions";
import Modal from "react-bootstrap/Modal";
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
  const handleInputChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "sport") {
      if (value === "tenis" || value === "padel") {
        setInput({ ...input, amountPlayers: 2 });
        setFlagSport(false);
        return;
      }

      if (value === "basquet") {
        setInput({ ...input, amountPlayers: 5 });
        setFlagSport(false);

        return;
      } else {
        setFlagSport(true);
      }
    }
    setInput({ ...input, [name]: value });
    console.log("soy el name", name);
    console.log("soy el value", value);

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
    dispatch(createTeam(input));
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
  };

  //---------------------- INVITACIONES A PLAYERS -------------------------
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/player/getPlayers").then((resp) => {
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

  const handleChangeInvite = (ev) => {
    setInpute(ev.target.value);
    autocomplete(ev);
  };
  const onClickInvite = (ev) => {
    if (input.amountPlayers === integrantes.length) {
      return;
    } else if (input.amountPlayers === "") {
      return;
    } else {
      ev.preventDefault();
      setInvitations([...invitations, ev.target.value]);
      setInpute(ev.target.value);
      setPlayerInput([]);
      setClick(true);
      setInputValue("");
      setIntegrantes([...integrantes, ev.target.value]);
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
    <div>
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title>
            <h2>Creá tu Equipo</h2>
            <p>Completá los datos de tu equipo!</p>
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
              {errors.name ? <h6>{errors.name}</h6> : null}
              <div>
                <h5>Seleccione un deporte</h5>
                <select name="sport" onChange={(e) => handleInputChange(e)}>
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
                </select>
                {flagSport ? (
                  <div>
                    <h5>Tipo de juego</h5>
                    <button
                      name="amountPlayers"
                      value={11}
                      onClick={(e) => handleInputChange(e)}
                    >
                      Futbol 11
                    </button>
                    <button
                      name="amountPlayers"
                      value={7}
                      onClick={(e) => handleInputChange(e)}
                    >
                      Futbol 7
                    </button>
                    <button
                      name="amountPlayers"
                      value={5}
                      onClick={(e) => handleInputChange(e)}
                    >
                      Futbol 5
                    </button>
                  </div>
                ) : null}
                {input.sport === "futbol" ? (
                  !input.amountPlayers ? (
                    <h5>Elija el tipo de Juego</h5>
                  ) : null
                ) : null}
                {errors.sport ? <h6>{errors.sport}</h6> : null}
              </div>
            </div>

            <div className={s.column}>
              <div>
                <h5>Imagen</h5>
                <input
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
                      defaultVlue={inputValue}
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
                      {!click ? <div>Debes seleccionar un jugador</div> : null}
                    </ul>
                    <div>
                      <ul>
                        {integrantes
                          ? integrantes.map((e) => {
                              return (
                                <div>
                                  <p>{e}</p>
                                  <button
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
        <Modal.Footer style={{ backgroundColor: "rgb(133, 133, 133);" }}>
          <button onClick={volver} variant="secondary">
            Volver
          </button>
          <div>
            {!loading &&
            !errors.name &&
            !errors.sport &&
            input.amountPlayers ? (
              <button type="submit" onClick={(e) => handleSubmit(e)}>
                Crear equipo
              </button>
            ) : (
              <button type="submit" disabled>
                Crear equipo
              </button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
