// const CrudApp = artifacts.require('./CrudApp.sol')
// const assert = require('assert')

// let crudInstance;


// contract('CrudApp' , (accounts)  => {
// 	beforeEach(async () => {
// 		crudInstance = await CrudApp.deployed()
// 	})

// 	it('should insert new user' , async() => {
// 		await crudInstance.insert("USA" , "Trump", 30000000);

// 		const country = await crudInstance.getCountry("USA");
// 		// console.log(country);
// 		assert.equal(country[0] , "USA");
// 		assert.equal(country[1] , "Trump");
// 		assert.equal(country[2].toNumber() , 30000000);


// 		await crudInstance.updateLeader("USA" , "Hillary");

// 		const country1 = await crudInstance.getCountry("USA");
// 		assert.equal(country1[0] , "USA");
// 		assert.equal(country1[1] , "Hillary");
// 		assert.equal(country1[2].toNumber() , 30000000);

// 		await crudInstance.deleteCountry("USA");

// 		const total = await crudInstance.getTotalCountries();
// 		console.log(total.toNumber())
// 		assert.equal(total , 0);
// 	})

// })