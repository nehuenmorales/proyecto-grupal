import react, { useState } from "react";
import VerticalNavbar from "../VerticalNavbar/VerticalNavbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createTeam } from "../../redux/Teams/teamsActions";

export function Teams({ email }) {
  let dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    sport: "",
    playerEmail: email,
    rating: 2.5,
    elo: 0,
    image: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
    console.log("soy el input", input);
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
    // setLoading(true);
    // console.log("cargando..", loading);

    const respuesta = await axios(
      "https://api.imgbb.com/1/upload?expiration=600&key=12d5944c0badc6235fe12ec6550754c8",
      settings
    );

    setInput({
      ...input,
      image: respuesta.data.data.url,
    });

    console.log("soy respuesta img", respuesta.data.data.url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTeam(input));
  };

  return (
    <>
      <div>
        <h2>Mis equipos</h2>
      </div>

      <div>
        <form
          onSubmit={(e) => handleSubmit(e)} /*encType='multipart/form-data'*/
        >
          <div className="row d-flex justify-content-center align-items-center px-5">
            <div>
              <h5>Nombre de el equipo</h5>
              <input
                type="text"
                name="name"
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            {/* <div className='col-md-6 col-sm-12 px-5'> */}
            <div>
              <div>
                <h5>Seleccione un deporte</h5>
                <select name="sport" onChange={(e) => handleInputChange(e)}>
                  <option hidden selected>
                    Deporte
                  </option>
                  <option value={"Futbol"}>Futbol</option>
                  <option value={"Basquet"}>Basquet</option>
                  <option value={"Padel"}>Padel</option>
                  <option value={"Tenis"}>Tenis</option>
                </select>
              </div>
              <div>
                <h5>Imagen</h5>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadImage}
                />
              </div>
            </div>
          </div>

          <div>
            {input ? (
              <button type="submit">Crear equipo</button>
            ) : (
              <button type="submit" disabled>
                Crear equipo
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
