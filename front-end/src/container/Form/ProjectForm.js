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
            goal: "",
            payment_packages: [["",""]]
        }
        this.handleInput = async (e) =>{
            e.preventDefault()
            await createProject(
                this.state.title,
                this.state.description,
                this.state.deadline,
                this.state.goal,
                this.state.payment_packages)
            alert("We received your transaction")
        }
        this.handleName = (e, i) => {
            this.state.payment_packages[i][0] = e.target.value
            this.setState({payment_packages: [...this.state.payment_packages] })
        }
        this.handleCost = (e, i) => {
            this.state.payment_packages[i][1] = e.target.value
            this.setState({payment_packages: [...this.state.payment_packages] })
        }
        this.handleCross = (i) => {
            if (this.state.payment_packages.length > 1) {
                this.setState({payment_packages: [...this.state.payment_packages.filter((_,idx) => idx !== i)] })
            }
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
            <input className="Form-input" type="text" placeholder="Project title" value={this.state.title} required
                onChange={(e) => this.setState({title: e.target.value})} />
            <textarea className="Form-input" type="text" placeholder="Project description" value={this.state.description} required
                onChange={(e) => this.setState({description: e.target.value})} />
            <input className="Form-input" type="number"  placeholder="Project duration (days)" value={this.state.deadline} required
                onChange={(e) => this.setState({deadline: e.target.value})} />
            <input className="Form-input" type="number" placeholder="Project goal (ETH)" value={this.state.goal} required
                onChange={(e) => this.setState({goal: e.target.value})} />
            {this.state.payment_packages.map((p,i) => {
                return (
                    <div style={{width:"100%"}} key={i}>
                    <button className="Form-cross" onClick={() => this.handleCross(i)}><span role="img" aria-label="cross">❌</span></button>
                    <input className="Form-input-left" type="text" placeholder="Package's name" value={p[0]} required
                        onChange={(e) => this.handleName(e,i)} />
                    <input className="Form-input-right" type="number" placeholder="Package's cost (ETH)" value={p[1]} required
                        onChange={(e) => this.handleCost(e,i)} />
                    </div>
                )
            })}
            <div className="Form-button" onClick={() => this.setState({payment_packages: [...this.state.payment_packages, ["",""]] })}><span role="img" aria-label="plus">➕</span></div>
            <button className="Form-button" type="submit">Submit</button>
        </form>
    )}
}