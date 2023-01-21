//SPDX-License-identifier: MIT
pragma solidity ^0.8.0;

import "./Exchange.sol";

contract Factory {

    mapping(address => mapping(address => address)) pairInfo;

    function createPair(address token1, address token2) public payable returns(address){
        
        address exchangeAddr = address(new Exchange(token1, token2));
        pairInfo[token1][token2] = exchangeAddr;
        return exchangeAddr;
    }

    function getPairAddress(address token1, address token2) external view returns(address){
        return pairInfo[token1][token2];
    }
}