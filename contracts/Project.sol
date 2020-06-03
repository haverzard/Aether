pragma solidity >=0.4.22 <0.7.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Project {
    using SafeMath for uint; // Because of lookup issue

    // State
    enum State {
        OnGoing,
        Expired,
        Fulfilled
    }

    address payable public creator;
    string public title;
    string public description;
    uint public currentBalance;
    uint public goal;
    uint public deadline;
    State public state = State.OnGoing;
    mapping (address => uint) public histories;

    // Function template
    modifier StateOn(State _state) {
        require(state == _state);
        _;
    }

    constructor
    (
        address payable _creator,
        string memory _title,
        string memory _description,
        uint _deadline,
        uint _goal
    ) public {
        creator = _creator;
        title = _title;
        description = _description;
        goal = _goal;
        deadline = _deadline;
        currentBalance = 0;
    }
    
    // Check status (only when fund comes in)
    function updateStatus() private {
        if (currentBalance >= goal) {
            state = State.Fulfilled;
            takeFund();
        } else if (deadline < now) {
            state = State.Expired;
        }
    }
    // Just in case transfer errors
    function takeFund() public {
        creator.transfer(currentBalance);
        currentBalance = 0;
    }

    // Ability to fund when on going
    function fund() public StateOn(State.OnGoing) payable {
        histories[msg.sender].add(msg.value);
        currentBalance += msg.value;
        updateStatus();
    }
    
    // Ability to refund after expired
    function refund() public StateOn(State.Expired) payable {
        require(histories[msg.sender] > 0);
        msg.sender.transfer(histories[msg.sender]);
        currentBalance -= histories[msg.sender];
        histories[msg.sender] = 0;
    }
    
    // Return all the datas
    function get() public view returns (
        address payable _creator,
        string memory _title,
        string memory _description,
        uint _deadline,
        State _state,
        uint _currentBalance,
        uint _goal
    ) {
        _creator = creator;
        _title = title;
        _description = description;
        _deadline = deadline;
        _state = state;
        _currentBalance = currentBalance;
        _goal = goal;
    }
}