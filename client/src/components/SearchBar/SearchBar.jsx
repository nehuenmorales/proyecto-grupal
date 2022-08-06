import React, { useState } from "react";
import { useEffect } from "react";
import {Button, Dropdown, DropdownButton, Form, FormGroup} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getSearchGames } from "../../redux/NuevoGames/gamesAction";
import { getSearchFields } from "../../redux/DetailField/DetailField-action";
import { gamesIncompleteOrderByAmount, getSearchGamesIncomplete } from "../../redux/GamesIncomplete/gamesIncompleteActions";
import { getSearchPlayer, orderByElo, } from "../../redux/Players/GetPlayersAction";
import { getSearcTournament } from "../../redux/Tournament/tounamentAction";
import { gamesOrderByPrice } from "../../redux/NuevoGames/gamesAction";
import s from "./SearchBar.module.css";
import { getSearchComplex, orderComplexRating,} from "../../redux/Complexes/ComplexAction";

export default function SearchBar({ sport, filtro, setFilter , state }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const onChange = (e) => {
    console.log("voy cambiando", e.target.value);
    setInput(e.target.value);
  };
  const [searchFlag, setSearchFlag] = useState(false);
  console.log("soy el estado",state)
  useEffect(() => {
    setSearchFlag(false);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("entro al submit", filtro);
    if (filtro === "turnos") {
      dispatch(getSearchGames(input, sport));
    }
    if (filtro === "canchas") {
      dispatch(getSearchFields(input, sport));
    }
    if (filtro === "jugadores") {
      dispatch(getSearchPlayer(input, sport));
    }
    if (filtro === "torneos") {
      dispatch(getSearcTournament(input, sport));
    }
    if (filtro === "complejos") {
      dispatch(getSearchComplex(input, sport));
    }
    if (filtro === "faltauno") {
      dispatch(getSearchGamesIncomplete(input, sport));
    }
    setSearchFlag(true);
  };
  const orderPlayers = (e) => {
    dispatch(orderByElo());
  };
  const orderByPrice = (e) => {
    dispatch(gamesOrderByPrice(e));
  };

  const orderByRating = (e) => {
    dispatch(orderComplexRating(e));
  };
  const orderByAmountGI = (e) => {
    dispatch(gamesIncompleteOrderByAmount(e));
  };

  return (
    <>
    <div className={s.containerSearchBar}>
      <FormGroup
        className="d-flex flex-start align-items-center"
        onSubmit={(e) => onSubmit(e)}
      >
        <Form.Control
          className={s.input}
          STYLE="color=#FFFFFF"
          size="sm"
          type="text"
          onChange={(e) => onChange(e)}
          placeholder={`Buscar ${filtro}...`}
        />
        <Button
          variant="success"
          type="submit"
          onClick={(e) => onSubmit(e)}
          style={{ height: "auto" }}
          className="m-1 text-white"
        >
          Buscar
        </Button>
      </FormGroup>


      {filtro === "jugadores" ? (
        <button className={s.bestPlayers} onClick={(e) => orderPlayers(e)}>
          Mejores jugadores
        </button>
      ) : null}
      {filtro === "turnos" ? (
        // <select className={s.select} onChange={(e) => {orderByPrice(e)}}  >
        //     <option className={s.option} selected disabled >
        //       Ordenar por precio
        //     </option>
        //     <option className={s.option} value={"mayorAmenor"}>
        //       Mayor precio
        //     </option>
        //     <option className={s.option} value={"menorAmayor"}>
        //       Menor precio
        //     </option>
        //   </select>
        <div className={s.containerFilters}>
          <div className="mb-2">
            {["end"].map((direction) => (
              <DropdownButton
                key={direction}
                id={`dropdown-button-drop-${direction}`}
                drop={direction}
                variant="secondary"
                title={`Ordenar por precio`}
              >
                <Dropdown.Item
                  onClick={(e) => {
                    orderByPrice("mayorAmenor");
                  }}
                  eventKey="1"
                >
                  Mayor Precio
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    orderByPrice("menorAmayor");
                  }}
                  eventKey="2"
                >
                  Menor Precio
                </Dropdown.Item>
                {/* <Dropdown.Divider />
            <Dropdown.Item eventKey="3">Separated link</Dropdown.Item> */}
              </DropdownButton>
            ))}
          </div>
        </div>
      ) : null}
      {filtro === "complejos" ? (
        // <select className={s.select} onChange={(e) => {orderByRating(e)}}  >
        //     <option className={s.option} selected disabled >
        //       Ordenar por rating
        //     </option>
        //     <option className={s.option} value={"mayorAmenor"}>
        //       Mayor rating
        //     </option>
        //     <option className={s.option} value={"menorAmayor"}>
        //       Menor rating
        //     </option>
        //   </select>
        <div className={s.containerFilters}>
          <div className="mb-2">
            {["end"].map((direction) => (
              <DropdownButton
              key={direction}
              id={`dropdown-button-drop-${direction}`}
              drop={direction}
              variant="secondary"
              title={`Ordenar por rating`}
              >
                <Dropdown.Item
                  onClick={() => {
                    orderByRating("mayorAmenor");
                  }}
                  eventKey="1"
                >
                  Mayor rating
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    orderByRating("menorAmayor");
                  }}
                  eventKey="2"
                >
                  Menor rating
                </Dropdown.Item>
                {/* <Dropdown.Divider />
            <Dropdown.Item eventKey="3">Separated link</Dropdown.Item> */}
              </DropdownButton>
            ))}
          </div>
        </div>
      ) : null}
      {filtro === "faltauno" ? (
        // <select className={s.select} onChange={(e) => {orderByAmountGI(e)}}  >
        //     <option className={s.option} selected disabled >
        //       Ordenar por cupos disponibles
        //     </option>
        //     <option className={s.option} value={"mayorAmenor"}>
        //       Mayor cupos
        //     </option>
        //     <option className={s.option} value={"menorAmayor"}>
        //       Menor cupos
        //     </option>
        //   </select>
        <div className={s.containerFilters}>
          <div className="mb-2">
            {["end"].map((direction) => (
              <DropdownButton
                key={direction}
                id={`dropdown-button-drop-${direction}`}
                drop={direction}
                variant="secondary"
                title={`Ordenar por cupos disponibles`}
              >
                <Dropdown.Item
                  onClick={() => {
                    orderByAmountGI("mayorAmenor");
                  }}
                  eventKey="1"
                >
                  Mayor cupos
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    orderByAmountGI("menorAmayor");
                  }}
                  eventKey="2"
                >
                  Menor cupos
                </Dropdown.Item>
                {/* <Dropdown.Divider />
            <Dropdown.Item eventKey="3">Separated link</Dropdown.Item> */}
              </DropdownButton>
            ))}
          </div>
        </div>
      ) : null}
    </div>
     {searchFlag?state?.length ? null : <div><p className={s.error}>No se encontraron resultados a tu busqueda</p></div> : null}
    </>
  );
}
