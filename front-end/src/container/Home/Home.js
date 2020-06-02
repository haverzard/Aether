import React, { useState, useEffect } from 'react'
import {CSSTransition} from 'react-transition-group'
import UserChoices from '../Choices/UserChoices.js'
import ProjectForm from '../Form/ProjectForm.js'
import Fund from '../Form/Fund.js'
import logo from './money.svg'
import './App.css'

export default function Home() {
    const [enabled, setEnabled] = useState(false)
    const [choice, setChoice] = useState("")
    useEffect(() => {
        document.addEventListener("keydown", (e) => { if (e.keyCode === 40) setEnabled(true) })
        return () => {
        document.removeEventListener("keydown", (e) => { if (e.keyCode === 40) setEnabled(true) }, false);
        }
    })
    return (
        <div>
        <header className="App-header">
            <CSSTransition
                in={!enabled}
                timeout={350}
                classNames="display"
                unmountOnExit
                appear
                >
                <div>
                <img src={logo} className="App-logo" alt="logo" />
                </div>
            </CSSTransition>
            <p className="App-title">
                CrowdFunding Platform
            </p>
            <p className="App-link">
                Create your own crowd funding projects here!
            </p>
            {!enabled && 
                <div id="App-arrow-container" onClick={() => setEnabled(true)}>
                    <div style={{opacity: 0.2}}>press key down or click this</div>
                    <span id="App-arrow"></span>
                </div>
            }
            <CSSTransition
                in={enabled}
                timeout={350}
                classNames="display"
                unmountOnExit
                appear
                >
                <UserChoices setChoice={setChoice} />
            </CSSTransition>
        </header>
        <CSSTransition
            in={choice == "Create"}
            timeout={350}
            classNames="display"
            unmountOnExit
            appear
            >
            <ProjectForm />
        </CSSTransition>
        <CSSTransition
            in={choice == "Fund"}
            timeout={350}
            classNames="display"
            unmountOnExit
            appear
            >
            <Fund />
        </CSSTransition>
        </div>
    )
}