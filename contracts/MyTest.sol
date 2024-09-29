//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// IMPORT THE HARDHAT CONSOLE
import "hardhat/console.sol";

contract MyTest {
    uint256 public unlockedTime;
    address payable public owner;

    event withDraw(uint256 amount, uint256 when);

    constructor(uint256 _unlockedTime) payable {
        require(
            block.timestamp < _unlockedTime,
            "Your unlocked time should be in future"
        );
        unlockedTime = _unlockedTime;
        owner = payable(msg.sender);
    }

    function withDrawFunds() public {
        require(
            block.timestamp > unlockedTime,
            "Wait untill the time period is completed"
        );
        require(msg.sender == owner, "You are not the owner");
        emit withDraw(address(this).balance, block.timestamp);
        owner.transfer(address(this).balance);
    }
}
