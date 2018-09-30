pragma solidity ^0.4.23;

contract CrudApp {
    
   struct country{
      string name;
      string leader;
      uint256 population;
   }
  
   country[] public countries; 

   uint256 public totalCountries;
  
  
   function CurdApp() public{
       totalCountries = 0;
   }
   
    
   function insert( string name , string leader , uint256 population) public returns (uint256 total){
        country memory newCountry = country(name , leader, population);
        countries.push(newCountry);
        totalCountries++;
        //emit event
        return total;
   }
   
   function updateLeader(string countryName, string newLeader) public returns (bool success){
       //This has a problem we need loop
       for(uint256 i =0; i< totalCountries; i++){
           if(compareStrings(countries[i].name ,countryName)){
              countries[i].leader = newLeader;
              //emit event
              return true;
           }
       }
       return false;
   }
   
   function deleteCountry(string countryName) public returns(bool success){
        require(totalCountries > 0);
        for(uint256 i =0; i< totalCountries; i++){
           if(compareStrings(countries[i].name , countryName)){
              countries[i] = countries[totalCountries-1]; // pushing last into current arrray index which we gonna delete
              delete countries[totalCountries-1]; // now deleteing last index
              totalCountries--; //total count decrease
              countries.length--; // array length decrease
              //emit event
              return true;
           }
       }
       return false;
   }
   
   
   function getCountry(string countryName) public view returns(string name , string leader , uint256 population){
        for(uint256 i =0; i< totalCountries; i++){
           if(compareStrings(countries[i].name, countryName)){
              //emit event
              return (countries[i].name , countries[i].leader , countries[i].population);
           }
       }
       revert();
   }     
   
   function compareStrings (string a, string b) public view returns (bool){
       return keccak256(a) == keccak256(b);
   }
   
   
   function getArrayLength() public view returns (uint256 length){
      return countries.length;
   }
}