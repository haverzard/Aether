/* eslint-disable */
import React from 'react'
import { getProjects, fundProject, refundProject } from '../../web3/project.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProgressBar from 'react-bootstrap/ProgressBar'
import "./Fund.css"

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: "",
            projects: [],
            loading: true
        }
    }
    componentDidMount() {
        setTimeout(window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100)
        getProjects().then((projects) => {
            this.setState({ projects: projects, loading: false })
        })
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
                        <div className="Project-goal">[GOAL — ETH {project._goal/(10**18)}]</div>
                    </div>
                    <div className="Project-desc">{project._description}</div>
                    <div className="Project-deadline">Project will be ongoing until {(new Date(project._deadline * 1000)).toUTCString()}</div>
                    <ProgressBar striped animated
                        variant={project._state == 0 ? "info" : (project._state == 2 ? "success" : "danger")}
                        label={percentage+"%"}
                        now={percentage}
                        style={{marginBottom: "20px" }} />
                    {project._state == 0 &&
                        <form className="" 
                            onSubmit={async (e)=>{
                                e.preventDefault()
                                await fundProject(project.contract._address, this.state.amount)
                                alert("We received your transaction, please refresh your browser")}}>
                            <input type="number" placeholder="Funding (in ETH)" value={this.state.amount} onChange={(e) => this.setState({amount: e.target.value})} />
                            <button>Fund</button>
                       </form>
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