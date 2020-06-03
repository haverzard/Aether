import React from 'react'
import { createProject } from '../../web3/project.js'
import './Form.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            deadline: "",
            goal: ""
        }
        this.handleInput = async (e) =>{
            e.preventDefault()
            await createProject(
                this.state.title,
                this.state.description,
                this.state.deadline,
                this.state.goal)
        }
    }
    componentDidMount() {        
        setTimeout(window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100)
    }
    
    render() {
    return (
        <form className="Project-form" onSubmit={this.handleInput}>
            <div className="Form-title">
                Create a new crowd-funding project
            </div>
            <input className="Form-input" type="text" placeholder="Project title" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} />
            <textarea className="Form-input" type="text" placeholder="Project description" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} />
            <input className="Form-input" type="number"  placeholder="Project duration (days)" value={this.state.deadline} onChange={(e) => this.setState({deadline: e.target.value})} />
            <input className="Form-input" type="number" placeholder="Project goal (ETH)" value={this.state.goal} onChange={(e) => this.setState({goal: e.target.value})} />
            <button className="Form-button" type="submit">Submit</button>
        </form>
    )}
}