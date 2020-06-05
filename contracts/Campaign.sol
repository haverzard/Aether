pragma solidity >=0.4.22 <0.7.0;

import './Project.sol';

contract Campaign {
    Project[] private projects;

    //Events
    event CreateProject(address indexed creator, string title);

    //Create project + add to contract
    function createProject(
        string memory title,
        string memory description,
        uint deadline,
        uint goal
    ) public {
        projects.push(new Project(msg.sender, title, description, now + (deadline * (1 days)), goal));
        emit CreateProject(msg.sender, title);
    }

    //Get projects stored in contract
    function getProjects() public view returns(Project[] memory) {
        return projects;
    }
}