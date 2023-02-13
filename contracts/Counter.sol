// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
// 声明协议 
// 声明版本


import "hardhat/console.sol";

contract Counter {
    //合约中的数据
    uint counts;

    //构造函数
    constructor (){
        counts = 0 ;
    }

    // 付费应用
    function add() public {
        counts = counts + 1 ;
    }

    // 免费应用
    // view 声明为非上链函数
    function getCounts() public view returns (uint) {
        return counts;
    }
}