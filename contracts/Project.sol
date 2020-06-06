pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2; // We need this to use arrays to create package name

import './PackageInterface.sol';

contract Project is PackageInterface {
    // State
    enum State {
        OnGoing,
        Expired,
        Fulfilled
    }
    // History data
    struct History {
        uint time;
        uint fund;
    }

    address payable public creator;
    string public title;
    string public description;
    uint public currentBalance;
    uint public goal;
    uint public deadline;
    State public state = State.OnGoing;
    mapping (address => History[]) private histories;
    mapping (address => uint) private accumulator;
    Package[] public packages;

    // Events
    event Transaction(address indexed requestor, string action, uint amount);
    event ClientRequest(string message);

    // Function template
    modifier StateOn(State _state) {
        require(state == _state, "Method Not Available on This Project State");
        _;
    }

    modifier CreatorOnly() {
        require(msg.sender == creator, "Only the creator can do that");
        _;
    }

    constructor
    (
        address payable _creator,
        string memory _title,
        string memory _description,
        uint _deadline,
        uint _goal,
        Package[] memory _packages
    ) public {
        creator = _creator;
        title = _title;
        description = _description;
        goal = _goal;
        deadline = _deadline;
        currentBalance = 0;
        for (uint i = 0; i < _packages.length; i++) {
            packages.push(_packages[i]);
        }
    }

    // Check status (client must use this)
    function updateStatus() private StateOn(State.OnGoing) {
        if (deadline < now) { // If deadline reached, don't make the project succeeds
            state = State.Expired;
        } else if (currentBalance >= goal) {
            state = State.Fulfilled;
            takeFund();
        }
    }

    // Just in case transfer errors
    function takeFund() public StateOn(State.Fulfilled) CreatorOnly() {
        creator.transfer(currentBalance);
        emit Transaction(creator, "Taking the funds", currentBalance);
        currentBalance = 0;
    }

    // Ability to fund when on going
    function fund() public StateOn(State.OnGoing) payable {
        accumulator[msg.sender] = accumulator[msg.sender] + msg.value;
        histories[msg.sender].push(History(now, msg.value));
        emit Transaction(msg.sender, "Funding the project", msg.value);
        currentBalance += msg.value;
        updateStatus();
    }

    // Ability to refund after expired
    function refund() public StateOn(State.Expired) payable {
        require(accumulator[msg.sender] > 0, "Refund is not available");
        msg.sender.transfer(accumulator[msg.sender]);
        emit Transaction(msg.sender, "Refunding the project", accumulator[msg.sender]);
        currentBalance -= accumulator[msg.sender];
        delete accumulator[msg.sender];
        delete histories[msg.sender];
    }

    // Return all the datas
    function get() public view returns (
        address payable _creator,
        string memory _title,
        string memory _description,
        uint _deadline,
        State _state,
        uint _currentBalance,
        uint _goal,
        Package[] memory _packages
    ) {
        _creator = creator;
        _title = title;
        _description = description;
        _deadline = deadline;
        _state = state;
        _currentBalance = currentBalance;
        _goal = goal;
        _packages = packages;
    }

    // Get a user history
    function getHistory(address user) public view returns (uint[] memory, uint[] memory) {
        uint[] memory times = new uint[](histories[user].length);
        uint[] memory funds = new uint[](histories[user].length);
        for (uint i = 0; i < histories[user].length; i++) {
            times[i] = histories[user][i].time;
            funds[i] = histories[user][i].fund;
        }
        return (times, funds);
    }
}