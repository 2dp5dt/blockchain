//SPDX-License-identifier: MIT
pragma solidity ^0.8.0;

interface IExchange{
    function getOutputAmountWithFee(address inputToken, uint256 inputTokenAmount) external view returns(uint256);
}