
import React from 'react'
import { getMyHistories } from '../../web3/project.js'
import './History.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            history: []
        }
    }
    componentDidMount() {
        setTimeout(window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100)
        getMyHistories().then((histories)=> {
            this.setState({ history: histories, loading: false })
            console.log(histories)
        })
    }
    render() {
    return (
        <div id="History-wrapper">
            {this.state.loading && 
                <div id="Page-loading">
                    Loading data...
                </div>}
            {!this.state.loading &&
            <div className="Payment-wrapper">
                <div className="Payment-title">
                    Your Payment Histories
                </div>
                <div className="Payment-data-wrapper">
                    <div className="Payment-date">
                        Date
                    </div>
                    <div className="Payment-project">
                        Project
                    </div>
                    <div className="Payment-creator">
                        Creator
                    </div>
                    <div className="Payment-cost">
                        Amount
                    </div>
                </div>
                {this.state.history.map((v,i) => {
                    return (
                        <div className="Payment-data-wrapper" key={i+1}>
                            <div className="Payment-date">
                                {(new Date(v[2] * 1000)).toString()}
                            </div>
                            <div className="Payment-project">
                                {v[0]}
                            </div>
                            <div className="Payment-creator">
                                {v[1]}
                            </div>
                            <div className="Payment-cost">
                                {v[3]/(10**18)} ETH
                            </div>
                        </div>
                    )
                })}
            </div>
            }
        </div>
    )}
}