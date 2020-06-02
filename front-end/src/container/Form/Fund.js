import React from 'react'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: "",
        }
    }
    render() {
    return (
        <form className="" onSubmit={(e)=>{ e.preventDefault() }}>
            <div className="">
                Create a new crowd-funding project
            </div>
            <input type="number" placeholder="Fund" value={this.state.amount} onChange={(e) => this.setState({amount: e.target.value})} />
            <input type="number" placeholder="Refund" value={this.state.amount} onChange={(e) => this.setState({amount: e.target.value})} />
        </form>
    )}
}