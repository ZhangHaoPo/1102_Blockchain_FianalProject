pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

uint256 constant TOTAL_GAMEITEM = 15;


contract Gameitems {
  address public owner = msg.sender;

  uint[TOTAL_GAMEITEM] public price = [1e17,1e16,1e15,1e16,1e15,1e17,1e16,1e17,1e16,1e15,1e16,1e15,1e17,1e16,1e15];
  uint[TOTAL_GAMEITEM] public category = [0,1,2,2,1,2,1,2,1,1,0,1,0,2,0];

  struct Gameitem {
    uint256 price;
    address owner;
    bool status; // true : solding, false : backpack, 
    uint256 category; // 0 : 服裝, 1 : 道具, 2 : 武器
  }

  Gameitem[TOTAL_GAMEITEM] public items;
  
  
  constructor() {
    for (uint256 i = 0; i < TOTAL_GAMEITEM; i++) {
      items[i].price = price[i]; // 0.1 ETH
      items[i].owner = address(0x0);
      items[i].status = true;
      items[i].category = category[i];
    }
  }

  // 商店往個人
  function buyitems(uint256 _index) external payable {
    require(_index < TOTAL_GAMEITEM && _index >= 0);
    require(items[_index].owner == address(0x0) || items[_index].owner != msg.sender);
    require(items[_index].status == true);
    require(msg.value >= items[_index].price);
    items[_index].owner = msg.sender;
    items[_index].status = false;
  }

  // 個人轉個人
  function send(address payable _addr, uint256 _index) payable public {
    require(msg.value >= items[_index].price);
    _addr.transfer(msg.value);
    items[_index].owner = msg.sender;
    items[_index].status = false;
  }
  // 個人往商店
  function wannasold(uint256 _index) public {
    require(_index < TOTAL_GAMEITEM && _index >= 0);
    require(items[_index].owner == msg.sender);
    require(items[_index].status == false);
    items[_index].status = true;
  }

  // 個人往商店(返回)
  function regretsold(uint256 _index) public {
    require(_index < TOTAL_GAMEITEM && _index >= 0);
    require(items[_index].owner == msg.sender);
    require(items[_index].status == true);
    items[_index].status = false;
  }

  // random value 遊戲業者要去設計的
  function randMod(uint256 _modulus, uint randNonce) public view returns(uint){
    randNonce++; 
    return uint(keccak256(abi.encodePacked(block.timestamp,msg.sender,randNonce))) % _modulus;
  }

}