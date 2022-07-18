import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CreateFields() {
  const dispatch = useDispatch();
  const [newField, setNewField] = useState({
    title: "",
    sport: "",
    available,
    pricePerHour,
    description: "",
    appointments: [],
  });

  const [errors, setErrors] = useState({
    title: "Enter the name of the field.",
    sport: "Enter the name of the sport",
    available: "Is it available to use?",
    pricePerHour: "Enter the price per hour",
    description: "Would be nice if you tell us a little bit of this field",
    appointments: "Enter the time range in which the players can play",
  });

  const validator = (e) => {
    // meter al estado y modificar a partir de ahi
    // le paso por parametro e
    let validations = {};
    const beNumber = /(^\d{1,10}$)/;
    const property = e.target.name;
    const value = e.target.value;

    if (property === "title" && !value) {
      return (validations[property] = "Enter the name of the field.");
    }
    if (property === "sport" && !value) {
      return (validations[property] = "Enter the name of the sport");
    }
    if (property === "available" && !value) {
      return (validations[property] = "Is it available to use?");
    }
    if (property === "pricePerHour" && !beNumber.test(value)) {
      return (validations[property] =
        "Enter the price per hour, Must be a number");
    }
    if (property === "description" && !value) {
      return (validations[property] =
        "Would be nice if you tell us a little bit of this field");
    }
    if (property === "appointments" && !value) {
      return (validations[property] =
        "Enter the time range in which the players can play");
    }
    validations[property] = "";

    return validations[property];
  };

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    if (e.target.name == "pricePerHour") {
      setNewField({
        ...newField,
        [e.target.name]: parseInt(e.target.value),
      });
    }
    setNewField({
      ...newField,
      [e.target.name]: e.target.value,
    });
    // console.log(validator(e));
    // console.log(e.target.value);

    setErrors({ ...errors, [e.target.name]: validator(e) });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(addRecipe(newRecipe)); //crear reducer que cree una receta en actions
    console.log(newField);
    setNewField({
      title: "",
      sport: "",
      available,
      pricePerHour,
      description: "",
      appointments: [],
    });
    alert("You created a field!");
    //window.location.href = "/recipes"; aca nos llevaria al home
  };
  // falta la parte de true/false en available
}
