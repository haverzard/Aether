pragma solidity >=0.4.22 <0.7.0;

import 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';
import './Project.sol';

contract Campaign {
    using SafeMath for uint; //Because of lookup issue
    Project[] private projects;

    event CreateProject(address indexed creator, string title);

    //Create project + add to contract
    function createProject(
        address payable creator,
        string memory title,
        string memory description,
        uint deadline,
        uint goal
    ) public {
        projects.push(new Project(creator, title, description, now.add(deadline.mul(1 days)), goal));
        emit CreateProject(creator, title);
    }

    //Get projects stored in contract
    function getProjects() public view returns(Project[] memory) {
        return projects;
    }
}