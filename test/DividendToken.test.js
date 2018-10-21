const DividendToken = artifacts.require('./DividendToken.sol')
const assert = require('assert')

// let tokenInstance;


contract('DividendToken' , (accounts)  => {
	beforeEach(async () => {
		this.tokenInstance = await DividendToken.deployed();
	});

	it('dividend Test' , async() => {	
		await this.tokenInstance.transfer(web3.eth.accounts[1],100000, {from : web3.eth.accounts[0]});
		await this.tokenInstance.disburse(100000);
		await this.tokenInstance.transfer(web3.eth.accounts[2],100000, {from : web3.eth.accounts[1]});
		const investor_1_balance = await this.tokenInstance.balanceOf(web3.eth.accounts[1]);
		const investor_2_balance = await this.tokenInstance.balanceOf(web3.eth.accounts[2]);
		const totalSupply = await this.tokenInstance.totalSupply_();
		assert.equal( totalSupply, 1100000);
		assert.equal(investor_1_balance, 10000);
		assert.equal(investor_2_balance, 100000);	
	})

})