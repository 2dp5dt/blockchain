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

    


    function addLiquidity(uint256 token1Amount, uint256 token2Amount) public {

        //토큰 비율 인풋 비율 검사
        token1.transferFrom(msg.sender,address(this), token1Amount);
        token2.transferFrom(msg.sender,address(this), token2Amount);   
    }

    function removeLiquidity(token1Amount, token2Amount) public {
        token1.transferFrom(address(this), msg.sender, token1Amount);
        token2.transferFrom(address(this), msg.sender, token2Amount);    
        _mint(msg.sender, 1);    
    }

    function tokenSwap(address tokenName, uint256 tokenAmount) public {
        if (tokenName == address(token1)){
            token1.transferFrom(msg.sender, address(this), tokenAmount);
            // tokenAmount에 비례한 swapTokenAmount
            uint256 swapTokenAmount = tokenAmount;
            token2.transfer(msg.sender, swapTokenAmount);

        }else if (tokenName == address(token2)){
            token2.transferFrom(msg.sender, address(this), tokenAmount);
            // tokenAmount에 비례한 swapTokenAmount
            uint256 swapTokenAmount = tokenAmount;
            token1.transfer(msg.sender, swapTokenAmount);
        }
    }

    function swapTransfer(address tokenName, uint256 tokenAmount, address toUser) public{
        uint256 swapTokenAmount = getOutputAmouyntWithFee(tokenName, tokenAmount);
        
        if (tokenName == address(token1)){
            token1.transferFrom(msg.sender, address(this), tokenAmount);   
            token2.transfer(toUser, swapTokenAmount);

        }else if (tokenName == address(token2)){
            token2.transferFrom(msg.sender, address(this), tokenAmount);
            // tokenAmount에 비례한 swapTokenAmount
            uint256 swapTokenAmount = tokenAmount;
            token1.transfer(toUser, swapTokenAmount);
        }
    }

    function getPrice() public view returns(uint256){
        uint256 token1Amount = token1.balanceOf(address(this));
        uint256 token2Amount = token2.balanceOf(address(this));

        return token1Amount / token2Amount;
    }

    function getOutputAmountWithFee(address inputToken, uint256 inputTokenAmount) public view returns(uint256){
        uint inputAmountWithFee = inputTokenAmount * 999;
        uint256 inTokenReserve;
        uint256 outTokenReserve;
        if (tokenName == address(token1)){
            inTokenReserve = token1.balanceOf(address(this)); 
            outTokenReserve = token2.balanceOf(address(this));
        }else if (tokenName == address(token2)){
            inTokenReserve = token2.balanceOf(address(this)); 
            outTokenReserve = token1.balanceOf(address(this));
        }
        uint256 numerator = outTokenReserve * inputAmountWithFee;
        uint256 denominator = inTokenReserve * 1000 + inputAmountWithFee;
        return numerator / denominator;
    }
    
}