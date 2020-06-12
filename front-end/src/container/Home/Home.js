/* eslint-disable */
import React from 'react'
import {CSSTransition} from 'react-transition-group'
import UserChoices from '../Choices/UserChoices.js'
import ProjectForm from '../Form/ProjectForm.js'
import Fund from '../Form/Fund.js'
import History from '../History/History.js'
import logo from './money.svg'
import './App.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            enabled: false,
            choice: "",
        }
        this.dummyRef = [React.createRef(null), React.createRef(null), React.createRef(null), React.createRef(null)]
    }

    componentDidMount() {
        document.addEventListener("keydown", (e) => { if (e.keyCode === 40) this.setState({ enabled: true}) })
        return () => {
        document.removeEventListener("keydown", (e) => { if (e.keyCode === 40) this.setState({ enabled: true}) }, false);
        }
    }
    render() {
    return (
        <div>
        <header className="App-header">
            <CSSTransition
                nodeRef={this.dummyRef[0]}
                in={!this.state.enabled}
                timeout={1000}
                classNames="display"
                unmountOnExit
                appear
                >
                <div ref={this.dummyRef[0]}>
                <img id="logo" src={logo} className="App-logo" alt="logo" />
                </div>
            </CSSTransition>
            <p className="App-title">
                Aether
            </p>
            <p className="App-link">
                Create your own crowd funding projects here!
            </p>
            {!this.state.enabled && 
                <div id="App-arrow-container" onClick={() => this.setState({ enabled: true })}>
                    <div style={{opacity: 0.2}}>press arrow down or click this</div>
                    <span id="App-arrow"></span>
                </div>
            }
            <CSSTransition
                nodeRef={this.dummyRef[1]}
                in={this.state.enabled}
                timeout={350}
                classNames="display"
                unmountOnExit
                appear
                >
                <div ref={this.dummyRef[1]}>
                <UserChoices setChoice={(v) => this.setState({choice: v})} />
                </div>
            </CSSTransition>
        </header>
        <CSSTransition
            nodeRef={this.dummyRef[2]}
            in={this.state.choice == "Create"}
            timeout={350}
            classNames="display"
            unmountOnExit
            appear
            >
            <div ref={this.dummyRef[2]}>
                <ProjectForm />
            </div>
        </CSSTransition>
        <CSSTransition
            nodeRef={this.dummyRef[3]}
            in={this.state.choice == "Fund"}
            timeout={350}
            classNames="display"
            unmountOnExit
            appear
            >
            <div ref={this.dummyRef[3]}>
                <Fund />
            </div>
        </CSSTransition>
        <CSSTransition
            nodeRef={this.dummyRef[3]}
            in={this.state.choice == "Mine"}
            timeout={350}
            classNames="display"
            unmountOnExit
            appear
            >
            <div ref={this.dummyRef[3]}>
                <Fund type="mine" />
            </div>
        </CSSTransition>
        <CSSTransition
            nodeRef={this.dummyRef[3]}
            in={this.state.choice == "History"}
            timeout={350}
            classNames="display"
            unmountOnExit
            appear
            >
            <div ref={this.dummyRef[3]}>
                <History />
            </div>
        </CSSTransition>
        </div>
    )}
}