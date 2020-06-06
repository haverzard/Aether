/* eslint-disable */
import React from 'react'
import { getProjects, getMyProjects, fundProject, refundProject } from '../../web3/project.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProgressBar from 'react-bootstrap/ProgressBar'
import "./Fund.css"

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            loading: true
        }
    }
    componentDidMount() {
        setTimeout(window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100)
        this.load = () => {
            if (this.props.type === "mine") {
                getMyProjects().then((projects) => {
                    this.setState({ projects: projects, loading: false })
                })
            } else {
                getProjects().then((projects) => {
                    this.setState({ projects: projects, loading: false })
                })
            }
        }
        this.load()
    }
    render() {
    return (
        <div id="Projects-wrapper">
            {this.state.loading && 
                <div id="Page-loading">
                    Loading data...
                </div>}
            {!this.state.loading &&
                <div id="Page-title">
                    Projects List
                </div>
                }
            {!this.state.loading && 
            this.state.projects.map((project, i) => {
            const percentage = (parseInt(project._currentBalance)*100/project._goal)
            return (
            <div className="Project-container" key={i}>
                <div className="Project-wrapper">
                    <div className="Project-main">
                        {project._state == 0 && <div className="Project-identifier" style={{backgroundColor: '#0fb0d1'}}>On Going</div>}
                        {project._state == 1 && <div className="Project-identifier" style={{backgroundColor: '#d15d0f'}}>Expired</div>}
                        {project._state == 2 && <div className="Project-identifier" style={{backgroundColor: '#0fd126'}}>Done</div>}
                        <div className="Project-title">{project._title}</div>
                        <div className="Project-goal">[GOAL — {project._goal/(10**18)} ETH]</div>
                    </div>
                    <div className="Project-desc">{project._description}</div>
                    <div className="Project-deadline">Project will be ongoing until {(new Date(project._deadline * 1000)).toString()}</div>
                    <ProgressBar striped animated
                        variant={project._state == 0 ? "info" : (project._state == 2 ? "success" : "danger")}
                        label={percentage+"%"}
                        now={percentage}
                        style={{marginBottom: "20px" }} />
                    {project._state == 0 &&
                        <div>
                            <div className="Project-package-title">
                                Payment Packages List
                            </div>
                            {project._packages.map((v,i) => {
                                return (
                                    <div className="Project-package-wrapper" key={i}>
                                        <div className="Project-package-name">
                                            {v.name}
                                        </div>
                                        <button className="Project-package-cost" 
                                            onClick={async () => {
                                                await fundProject(project.contract._address, parseInt(v.cost))
                                                this.load()
                                            }}>
                                            PAY {v.cost/(10**18)} ETH
                                        </button>
                                    </div>
                                )
                            })}
                       </div>
                        }
                    {project._state == 1 &&
                        <form className=""
                            onSubmit={async (e)=>{
                                e.preventDefault()
                                await refundProject(project.contract._address)
                                alert("We received your transaction, please refresh your browser")}}>
                            <button>Refund</button>
                       </form>
                        }
                    
                </div>
            </div>
            )
            })}
        </div>
    )}
}