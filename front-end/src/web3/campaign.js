import web3 from './web3.js'

const address = "0xC558968b0B82a5aE76012De1e8827F43769E5AB1"
const campaignAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "goal",
				"type": "uint256"
			}
		],
		"name": "createProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProjects",
		"outputs": [
			{
				"internalType": "contract Project[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export let campaignContract = new web3.eth.Contract(campaignAbi, address)