# Crowdfunding Platform
![Node.js CI](https://github.com/haverzard/CrowdFunding_Ethereum/workflows/Node.js%20CI/badge.svg)

![View](view.gif)

Funding for a project is a common problem, so why don't we just create our own?

## Prerequisites
- MetaMask: https://metamask.io/
- Node.js: https://nodejs.org/en/
- Serve: `npm install -g serve`

## Usage
### Deploy your contracts
- Open Remix (https://remix.ethereum.org/) and copy-paste files in the contracts folder
- Choose Solidity enviroment and open compiler menu
- Choose compiler `0.6.6+commit.6c089d02`
- Open deploy menu, pick injected web3 enviroment, and choose your account
- Click deploy and accept the transaction
- Your contracts has been deployed and remember the address
- Also remember the abi in compile menu for each contract

### Setup the front-end
#### Using your own contracts (with same format obviously)
Please skip this step if you don't want to deploy your own contracts
- Open `front-end/src/web3/campaign.js` file and change the address with your deployed contract's address and also change the campaign contract's abi with your own
- Open `front-end/src/web3/project.js` file and change the project contract's abi with your own
- Done

#### Run front-end
- Move to front-end folder
- Run `npm install`
- Run `npm run build`
- Run `serve -s build`

## Front-end

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# References
- TutorialsPoint: https://www.tutorialspoint.com/solidity
- Solidity: https://github.com/ethereum/solidity/
- Web3: https://github.com/ethereum/web3.js/
- React: https://reactjs.org/docs
- Metamask_Web3: https://medium.com/@awantoch/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a
- Ethereum doesn't open metamask: https://ethereum.stackexchange.com/questions/69242/etherum-enable-not-opening-metamask