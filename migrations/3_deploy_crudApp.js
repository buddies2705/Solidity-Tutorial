var CrudApp = artifacts.require("./CrudApp.sol");

module.exports = function(deployer) {
  deployer.deploy(CrudApp);
};
