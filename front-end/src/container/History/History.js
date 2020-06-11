
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
            <table className="Payment-wrapper">
                <tbody className="Payment-title">
                    Your Payment Histories
                </tbody>
                <tbody className="Payment-data-wrapper">
                    <th className="Payment-date">
                        Date
                    </th>
                    <th className="Payment-project">
                        Project
                    </th>
                    <th className="Payment-creator">
                        Creator
                    </th>
                    <th className="Payment-cost">
                        Amount
                    </th>
                </tbody>
                {this.state.history.map((v,i) => {
                    return (
                        <tbody className="Payment-data-wrapper" key={i+1}>
                            <td className="Payment-date">
                                {(new Date(v[2] * 1000)).toString()}
                            </td>
                            <td className="Payment-project">
                                {v[0]}
                            </td>
                            <td className="Payment-creator">
                                {v[1]}
                            </td>
                            <td className="Payment-cost">
                                {v[3]/(10**18)} ETH
                            </td>
                        </tbody>
                    )
                })}
            </table>
            }
        </div>
    )}
}