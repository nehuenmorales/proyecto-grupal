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
    appointments: "Enter the time range in which the players can ",
  });
}
