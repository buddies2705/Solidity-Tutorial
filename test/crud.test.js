// const Crud = artifacts.require('./Crud.sol')
// const assert = require('assert')

// let contractInstance;


// contract('Crud' , (accounts)  => {
// 	beforeEach(async () => {
// 		contractInstance = await Crud.deployed()
// 	})

// 	it('should insert new user' , async() => {
// 		await contractInstance.insertUser(web3.eth.accounts[0], "Gaurav" , "India")

// 		const insertedUser = await contractInstance.getUser(web3.eth.accounts[0]);
// 		assert.equal(insertedUser[0] , "Gaurav");
// 		assert.equal(insertedUser[1] , "India");
// 	})

// })