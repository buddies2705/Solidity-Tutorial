const CrudApp = artifacts.require('./CrudApp.sol')
const assert = require('assert')

let crudInstance;


contract('CrudApp' , (accounts)  => {
	beforeEach(async () => {
		crudInstance = await CrudApp.deployed()
	})

	it('should insert new user' , async() => {
		await crudInstance.insert("USA" , "Trump", 30000000)

		const country = await crudInstance.getCountry("USA");
		console.log(country);
		assert.equal(country[0] , "USA");
		assert.equal(country[1] , "Trump");
		// assert.equal(country[2].toNumber() , 30000000);
	})

})