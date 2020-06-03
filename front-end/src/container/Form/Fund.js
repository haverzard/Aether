import React from 'react'
import { getProjects } from '../../web3/project.js'
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
            console.log(projects)
        })
    }
    render() {
    return (
        <div id="Projects-wrapper">
            {this.state.loading && "Loading data..."}
            {!this.state.loading && this.state.projects.map((project, i) => 
            {
            return (
            <div className="Project-container" key={i}>
                <div>
                    <div>{project._title}</div>
                    <div>{project._description}</div>
                    <div>{project._deadline}</div>
                    <div>{project._state}</div>
                    <div>{project._goal}</div>
                    <div>{project._currentBalance}</div>
                </div>
                <form className="" onSubmit={(e)=>{ e.preventDefault() }}>
                    <input type="number" placeholder="Fund" value={this.state.amount} onChange={(e) => this.setState({amount: e.target.value})} />
                    <input type="number" placeholder="Refund" value={this.state.amount} onChange={(e) => this.setState({amount: e.target.value})} />
                </form>
            </div>
            )
            })}
        </div>
    )}
}