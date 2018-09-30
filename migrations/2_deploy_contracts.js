var Crud = artifacts.require("./Crud.sol");

module.exports = function(deployer) {
  deployer.deploy(Crud);
};
