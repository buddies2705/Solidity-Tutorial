const ExampleToken = artifacts.require('./ExampleToken.sol')
const assert = require('assert')

// let tokenInstance;


contract('ExampleToken' , (accounts)  => {
	beforeEach(async () => {
		this.tokenInstance = await ExampleToken.new('ExampleToken', 'EXM' , 18, 20000);
	});

	// it('Token Test' , async() => {	
	// 	const name =  await this.tokenInstance.name();
	// 	assert.equal(name , "ExampleToken");
	// })

})