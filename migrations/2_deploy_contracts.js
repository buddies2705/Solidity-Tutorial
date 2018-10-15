var ExampleToken = artifacts.require("./ExampleToken.sol");
var ExampleTokenCrowdsale = artifacts.require("./ExampleTokenCrowdsale.sol");

const ether = (n) => new web3.BigNumber(web3.toWei(n, 'ether'));

const duration = {
  seconds: function (val) { return val; },
  minutes: function (val) { return val * this.seconds(60); },
  hours: function (val) { return val * this.minutes(60); },
  days: function (val) { return val * this.hours(24); },
  weeks: function (val) { return val * this.days(7); },
  years: function (val) { return val * this.days(365); },
};


module.exports = async function(deployer , network , accounts) {
  const _name = "Example Token";
  const _symbol = "EXM";
  const _decimal = 18;
  const latestTime = (new Date).getTime();
  const _openingTime    = latestTime;
  const _closingTime    = _openingTime + duration.weeks(1);



  //Do not work because of chain deploymen
  // await deployer.deploy(ExampleToken,_name,_symbol,_decimal);
  // const token = await ExampleToken.deployed();
  // await deployer.deploy(ExampleTokenCrowdsale, 500, accounts[0], token,address);


  deployer.deploy(ExampleToken,_name,_symbol,_decimal)
  .then(() => ExampleToken.deployed())
  .then(token => deployer.deploy(ExampleTokenCrowdsale
                                  , 500
                                  , accounts[0]
                                  , token.address
                                  , ether(200)
                                  , _openingTime
                                  , _closingTime))
};



