	pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";


/**
 * @title DetailedERC20 token
 * @dev The decimals are only for visualization purposes.
 * All the operations are done using the smallest and indivisible token unit,
 * just as on Ethereum all the operations are done in wei.
 */
contract ExampleToken is  StandardToken, DetailedERC20, BurnableToken{

  //We inherited the DetailedERC20 
  constructor(string _name, string _symbol, uint8 _decimals) 
  DetailedERC20(_name, _symbol, _decimals)
  public {
  	totalSupply_ = 10000;
  	balances[msg.sender] = 10000;
  }

}