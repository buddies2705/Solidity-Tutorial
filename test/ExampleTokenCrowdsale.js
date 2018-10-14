const ExampleToken = artifacts.require('./ExampleToken.sol');
const ExampleTokenCrowdsale = artifacts.require('./ExampleTokenCrowdsale.sol');
const assert = require('assert');
const assertRevert = require('openzeppelin-solidity/test/helpers/assertRevert.js')

const ether = (n) => new web3.BigNumber(web3.toWei(n, 'ether'));

contract('ExampleTokenCrowdsale' , ([_, wallet, investor1, investor2, investor3])  => {
	beforeEach(async () => {
		
		this.tokenInstance = await ExampleToken.new('ExampleToken', 'EXM' , 18);
		
		this.rate = 500; 
		this.wallet = wallet;
		this.token = this.tokenInstance;
		this.cap = ether(100);
		
		this.crowdsale = await ExampleTokenCrowdsale
		.new(this.rate, 
			this.wallet, 
			this.token.address,
			this.cap);
		await this.token.transferOwnership(this.crowdsale.address);
	})


	it('TokenTest' , async() => {	
		 const tok =  await this.crowdsale.token();
		 console.log(this.token.address);
		 console.log(tok);
		assert.equal(tok , this.token.address);
	});

	it('TransferTest' , async() => {
		var value = new web3.BigNumber(web3.toWei(20));
		const tok =  await this.crowdsale.sendTransaction({value: value , from : investor1});
	})

		it('cappedtest' , async() => {
		var value = ether(1);
		// try {
		await this.crowdsale.buyTokens(investor2, {value: value , from : investor2});
    	//assert.fail('Expected revert not received');
 		 // } catch (error) {
 		   // const revertFound = error.message.search('revert') >= 0;
  			  // assert(revertFound, `Expected "revert", got ${error} instead`);
  			// }

		})

}) 