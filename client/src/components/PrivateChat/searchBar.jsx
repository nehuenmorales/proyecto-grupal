import React from "react"
import { useState } from "react";
import { Button, Dropdown, DropdownButton, Form, FormGroup } from "react-bootstrap";



export default function SearchUser({ usersConnected, setUserSeach }) {
    const [input, setInput] = useState("");


    const handleOnChange = (e) => {
        e.preventDefault();
        setInput(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("entro al submit")
        // let filtrados = [];
        // for (let i = 0; i < usersConnected.length; i++) {
        //     if (usersConnected[i].name.search(input) === -1) {
        //         return
        //     } else {
        //         filtrados.push(usersConnected[i])
        //     }
        // }
        let filtrados = usersConnected.filter((e) => e.name.includes(input))
        console.log("filtrados a ver si se veeeee", filtrados)
        setUserSeach(filtrados)
    }

    return (
        <FormGroup
            className="d-flex flex-start align-items-center"
        // onSubmit={(e) => onSubmit(e)}
        >
            <Form.Control
                // className={s.input}
                STYLE="color=#FFFFFF"
                size="sm"
                type="text"
                onChange={(e) => handleOnChange(e)}
                placeholder={`Buscar...`}
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

    )
}