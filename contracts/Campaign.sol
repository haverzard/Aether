pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2; // We need this to use arrays to create package name

import './PackageInterface.sol';
import './Project.sol';

contract Campaign is PackageInterface {
    Project[] private projects;

    //Events
    event CreateProject(address indexed creator, string title);

    //Create project + add to contract
    function createProject(
        string memory title,
        string memory description,
        uint deadline,
        uint goal,
        Package[] memory packages
    ) public {
        projects.push(new Project(msg.sender, title, description, now + (deadline * (1 days)), goal, packages));
        emit CreateProject(msg.sender, title);
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }
}