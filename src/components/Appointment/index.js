import React from "react"
import "./Appointment.scss"
import Header from "./Header.js"
import Show from "./Show.js"
import Status from "./Status.js"

export default function Appointment() {

    return (
        <article className="appointment">
            <Header time="12pm"/>
            <Show />
            <Status />
        </article>
    )
}