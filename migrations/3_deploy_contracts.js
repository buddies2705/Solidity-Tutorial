var DividentToken = artifacts.require("./DividendToken.sol");

module.exports = function(deployer) {
  deployer.deploy(DividentToken);
};

