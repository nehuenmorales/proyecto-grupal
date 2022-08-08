import react, { useEffect, useState } from "react";
import VerticalNavbar from "../VerticalNavbar/VerticalNavbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createTeam, getTeamsUser } from "../../redux/Teams/teamsActions";
import TeamsCard from "./TeamsCard";
import Modal from "react-bootstrap/Modal";
import { ModalCreateTeam } from "./modalCreateTeam";
import s from "./diseñoTeams/teamsCard.module.css";

export function Teams({ email }) {
  const userTeams = useSelector((state) => state.teamsReducer.userTeams);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeamsUser(email));
  }, []);

  const [showModal, setShowModal] = useState(false);
  console.log("soy user teams", userTeams);
  const modalOpen = (e) => {
    e.preventDefault()
    setShowModal(true);
    console.log("entro a modal open");
  };
  return (
    <div>
      <div className={s.buttoncontainer}>
          <button style={{color: 'white', border: 'none'}} className={s.button} onClick={(e) => modalOpen(e)}>
            Crea un equipo
          </button>
      </div>
      <div>
        <h2 className={s.titleTeams} >Mis equipos</h2>
      </div>
      <div className={s.conteinerCard}>
        {userTeams.length
          ? userTeams.map((e) => <TeamsCard props={e} />)
          : null}
      </div>
      <ModalCreateTeam
        email={email}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}
