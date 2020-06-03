import web3 from './web3.js'

const address = "0xb815Ff9C66F154E182f748004E90974E0f4460e4"
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