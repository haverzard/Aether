import React from 'react'
import { createProject, getProjects } from '../../web3/project.js'

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
            console.log(await getProjects())
        }
    }
    
    render() {
    return (
        <form className="" onSubmit={this.handleInput}>
            <div className="">
                Create a new crowd-funding project
            </div>
            <input type="text" placeholder="Project title" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} />
            <input type="text" placeholder="Project description" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} />
            <input type="number"  placeholder="Project duration (days)" value={this.state.deadline} onChange={(e) => this.setState({deadline: e.target.value})} />
            <input type="number" placeholder="Project goal (ETH)" value={this.state.goal} onChange={(e) => this.setState({goal: e.target.value})} />
            <input type="submit" />
        </form>
    )}
}