import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./cardPlayers.module.css";

const CardPlayers = player => {

    const { name, lastName, username, city, elo } = player;

    return (

        <Card className={styles.cardContainer}>
            <div className={styles.avatarContainer}>
                <img className={styles.avatar} src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/245px-Cristiano_Ronaldo_2018.jpg" />
            </div>
            <div className={styles.information}>
                <p>
                    <span>{ name + ' ' + lastName }</span>
                    <span >{ elo }</span>
                </p>
            </div>
        </Card>

    );

}
export default CardPlayers;
