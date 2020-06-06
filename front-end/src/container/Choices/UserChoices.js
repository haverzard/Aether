import React from 'react'
import './Choice.css'

export default function Home(props) {
    return (
        <div className="Choice-flex">
            <div className="Choice-box" onClick={() => { props.setChoice("Create"); setTimeout(window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100); }}>
                Create a new crowd-funding project
            </div>
            <div className="Choice-box" onClick={() => { props.setChoice("Fund"); setTimeout(window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100); }}>
                Fund a project
            </div>
            <div className="Choice-box" onClick={() => { props.setChoice("Mine"); setTimeout(window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100); }}>
                Show my projects
            </div>
            <div className="Choice-box" onClick={() => { props.setChoice("History"); setTimeout(window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100); }}>
                Show my histories
            </div>
        </div>
    )
}