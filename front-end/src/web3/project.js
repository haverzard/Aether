import web3 from './web3.js'
import {campaignContract} from "./campaign.js"

export const projectAbi = [
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_creator",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_goal",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "cost",
						"type": "uint256"
					}
				],
				"internalType": "struct PackageInterface.Package[]",
				"name": "_packages",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "ClientRequest",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "fund",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "refund",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "takeFund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "requestor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "action",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Transaction",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "creator",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deadline",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "description",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "_creator",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_deadline",
				"type": "uint256"
			},
			{
				"internalType": "enum Project.State",
				"name": "_state",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_currentBalance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_goal",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "cost",
						"type": "uint256"
					}
				],
				"internalType": "struct PackageInterface.Package[]",
				"name": "_packages",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getHistory",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "goal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "packages",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "cost",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "state",
		"outputs": [
			{
				"internalType": "enum Project.State",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "title",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export async function getMyHistories() {
	let output = []
	for (let address of (await campaignContract.methods.getProjects().call())) {
		let projectContract = new web3.eth.Contract(projectAbi, address)
		let histories = await projectContract.methods.getHistory((await web3.eth.getAccounts())[0]).call()
		console.log(histories)
		let name = await projectContract.methods.title().call()
		let creator = await projectContract.methods.creator().call()
		output = [...output, ...histories[0].map((e, i) => [name, creator, e, histories[1][i]])]
	}
	return output
}

export async function getProjects() {
    let output = []
    for (let address of (await campaignContract.methods.getProjects().call())) {
		let projectContract = new web3.eth.Contract(projectAbi, address)
		let project = await projectContract.methods.get().call()
		project.contract = projectContract
        output.push(project)
    }
    return output
}

export async function getMyProjects() {
	let output = []
	let account = (await web3.eth.getAccounts())[0]
    for (let address of (await campaignContract.methods.getProjects().call())) {
		let projectContract = new web3.eth.Contract(projectAbi, address)
		let project = await projectContract.methods.get().call()
		if (project._creator === account) {
			project.contract = projectContract
			project.history = await projectContract.methods.getHistory((await web3.eth.getAccounts())[0]).call()
			output.push(project)
		}
    }
    return output
}

export async function createProject(title, description, deadline, goal, packages) {
	packages = packages.map(v => { v[1] = web3.utils.toWei(v[1], 'ether'); return v })
    return await campaignContract.methods.createProject(title, description, deadline, web3.utils.toWei(goal, 'ether'), packages).send({
      from: (await web3.eth.getAccounts())[0],
	})
}

export async function fundProject(address, amount) {    
	let projectContract = new web3.eth.Contract(projectAbi, address)
    return await projectContract.methods.fund().send({
	  from: (await web3.eth.getAccounts())[0],
	  value: amount
	})
}

export async function refundProject(address) {
	let projectContract = new web3.eth.Contract(projectAbi, address)
    return await projectContract.methods.refund().send({
      from: (await web3.eth.getAccounts())[0]
	})
}