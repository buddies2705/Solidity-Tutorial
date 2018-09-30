pragma solidity ^0.4.23;

contract Crud {

   struct userStruct {
       string userName; 
       string country; 
       uint index; 
   }

    mapping(address => userStruct) private userStructs; 
    address[] private userIndex; 

    event userEvent(address indexed userAddress, uint index, string userName, string country);

   function isUser(address userAddress) public constant returns(bool isExist){
   if(userIndex.length == 0) return false; 
       return (userIndex[userStructs[userAddress].index] == userAddress);
    }



    function insertUser(
        address userAddress,
        string userName,  	 	
        string country)  public returns(uint index){
    require(!isUser(userAddress));
    userStructs[userAddress].userName = userName;
    userStructs[userAddress].country = country;
    userStructs[userAddress].index = userIndex.push(userAddress)-1; 
    emit userEvent(
    userAddress,
    userStructs[userAddress].index,
    userName,
    country);
    return userIndex.length-1;
    }



    function getUser(address userAddress)
    public
    constant
    returns(string userName, string country, uint index){
    require(isUser(userAddress));
    return(
    userStructs[userAddress].userName,
    userStructs[userAddress].country,
    userStructs[userAddress].index);
    }


    function updateUserName(address userAddress, string userName)
    public
    returns(bool success){
    require(isUser(userAddress));
    userStructs[userAddress].userName = userName;
    emit userEvent(
    userAddress,
    userStructs[userAddress].index,
    userName,
    userStructs[userAddress].country);
    return true;
    }


    function getUserCount()
    public
    constant
    returns(uint count){
    return userIndex.length; 
    }
    
    function getUserAtIndex(uint index)
    public
    constant
    returns(address userAddress){
    return userIndex[index];
    }

}