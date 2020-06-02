import React from 'react'
import './Choice.css'

export default function Home(props) {
    return (
        <div className="Choice-flex">
            <div className="Choice-box" onClick={() => props.setChoice("Create")}>
                Create a new crowd-funding project
            </div>
            <div className="Choice-box" onClick={() => props.setChoice("Fund")}>
                Fund a project
            </div>
        </div>
    )
}