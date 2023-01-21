//SPDX-License-identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Exchange is ERC20{
    constructor(
        address _token1,
        address _token2
    ) ERC20("defi-OPEN","OPEN"){
        token1 = IERC20(_token1);
        token2 = IERC20(_token2);
        factory = IFactory(msg.sender);
    }



    function addLiquidity(uint256 token1Amount, uint256 token2Amount) public payable {

    }

    function removeLiquidity(token1Amount, token2Amount) public payable{

    }

    function tokenSwap() public payable{

    }

    function swapTransfer(address _user) public payable{

    }

    function getPrice() public view returns(uint256){
        factory
    }

    function getOutputAmount(address token1, address token2) public view returns(uint256){

    }
}