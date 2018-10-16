const ExampleToken = artifacts.require('./ExampleToken.sol');
const ExampleTokenCrowdsale = artifacts.require('./ExampleTokenCrowdsale.sol');
const assert = require('assert');


const latestTime = () => web3.eth.getBlock('latest').timestamp;

const ether = (n) => new web3.BigNumber(web3.toWei(n, 'ether'));


function increaseTime (duration) {
  const id = Date.now();

  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [duration],
      id: id,
    }, err1 => {
      if (err1) return reject(err1);

      web3.currentProvider.sendAsync({
        jsonrpc: '2.0',
        method: 'evm_mine',
        id: id + 1,
      }, (err2, res) => {
        return err2 ? reject(err2) : resolve(res);
      });
    });
  });
}


async function increaseTimeTo (target) {
  const now = (await latestTime());

  if (target < now) throw Error(`Cannot increase current time(${now}) to a moment in the past(${target})`);
  const diff = target - now;
  return increaseTime(diff);
}

const duration = {
  seconds: function (val) { return val; },
  minutes: function (val) { return val * this.seconds(60); },
  hours: function (val) { return val * this.minutes(60); },
  days: function (val) { return val * this.hours(24); },
  weeks: function (val) { return val * this.days(7); },
  years: function (val) { return val * this.days(365); },
};




contract('ExampleTokenCrowdsale' , ([_, wallet, investor1, investor2, investor3])  => {
	beforeEach(async () => {	
		this.tokenInstance = await ExampleToken.new('ExampleToken', 'EXM' , 18);
		this.rate = 500; 
		this.wallet = wallet;
		this.token = this.tokenInstance;
		this.cap = ether(100);
		this.openingTime = latestTime() ;
		this.closingTime = this.openingTime + duration.weeks(2);
		
		this.crowdsale = await ExampleTokenCrowdsale
		.new(this.rate, 
			this.wallet, 
			this.token.address,
			this.cap,
			this.openingTime,
			this.closingTime);

		// await this.token.transferOwnership(this.crowdsale.address);
		console.log(this.openingTime);
		// await increaseTimeTo(this.openingTime + 1);
	})


	// it('TokenTest' , async() => {	
	// 	 const tok =  await this.crowdsale.token();
	// 	 console.log(this.token.address);
	// 	 console.log(tok);
	// 	assert.equal(tok , this.token.address);
	// });

	
	// it('TransferTest' , async() => {
	// 	var value = new web3.BigNumber(web3.toWei(20));
	// 	const tok =  await this.crowdsale.sendTransaction({value: value , from : investor1});
	// })

	// 	it('cappedtest' , async() => {
	// 	var value = ether(1);
	// 	try {
	// 	await this.crowdsale.buyTokens(investor2, {value: value , from : investor2});
 //    	assert.fail('Expected revert not received');
 // 		 } catch (error) {
 // 		   const revertFound = error.message.search('revert') >= 0;
 //  			  assert(revertFound, `Expected "revert", got ${error} instead`);
 //  			}

	// })

	it('Timed test' , async() => {	
		 const isClosed =  await this.crowdsale.hasClosed();
		 console.log(isClosed);
		assert.equal(isClosed , false);
	});

	it('Burn test' , async() => {	
		 await this.token.burn(1000);
		 const totalSupply = await this.token.totalSupply();
		 console.log(totalSupply);
		assert.equal(totalSupply , 9000);
	});

}) 