import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import VerticalNavbar from "../../../components/VerticalNavbar/VerticalNavbar";

import "./FieldList.css";

export default function FieldList() {
  const [field, setField] = useState([]);
  let owner = useSelector((state) => state.getOwnerReducer.owner);
  useEffect(() => {
    axios
      .get(`/owner/getFieldByOwner/${owner.id}`)
      .then((res) => setField(res.data));
  }, []);
  const cambioHora = (num) => {
    let numero = num.toString();
    if (!numero.includes(".")) {
      return numero + ":00";
    } else {
      let resultado = numero.replace(".5", ":30");
      return resultado;
    }
  };

  return (
    <div className="fieldlist-container">
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ padding: "10px", width: "25%" }}>
          <Button>Volver</Button>
        </Link>
        <VerticalNavbar />
      </div>
      <p
        className="fw-normal text-white fst-italic m-2"
        style={{ padding: "0 0 0px 30px", fontSize: "1.2em" }}
      >
        Tus canchas
      </p>
      <div className="contenedor-cards">
        {field?.map((e) => {
          return e.fields?.map((el) => {
            return (
              <div key={el.id} className="card-sport">
                {el.sport == "futbol" ? (
                  <div className="futbol">
                    <div className="name">
                      <p>{el.name}</p>
                    </div>
                    <div className="deporteCard">
                      <p>Apertura:</p>
                      <p> {cambioHora(el.start)}hs</p>
                      <p>-Cierre:</p>
                      <p> {cambioHora(el.end)}hs</p>
                    </div>
                  </div>
                ) : el.sport == "basquet" ? (
                  <div className="basquet">
                    <div className="name">
                      <p>{el.name}</p>
                    </div>
                    <div className="deporteCard">
                      <p>Apertura:</p>
                      <p> {cambioHora(el.start)}hs</p>
                      <p>-Cierre:</p>
                      <p> {cambioHora(el.end)}hs</p>
                    </div>
                  </div>
                ) : el.sport == "tenis" ? (
                  <div className="tenis">
                    <div className="name">
                      <p>{el.name}</p>
                    </div>
                    <div className="deporteCard">
                      <p>Apertura:</p>
                      <p> {cambioHora(el.start)}hs</p>
                      <p>-Cierre:</p>
                      <p>{cambioHora(el.end)}hs</p>
                    </div>
                  </div>
                ) : (
                  <div className="padel">
                    <div className="name">
                      <p>{el.name}</p>
                    </div>
                    <div className="deporteCard">
                      <p>Apertura:</p>
                      <p> {cambioHora(el.start)}hs</p>
                      <p>-Cierre:</p>
                      <p> {cambioHora(el.end)}hs</p>
                    </div>
                  </div>
                )}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
