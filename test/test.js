//adding the 'chai' assertion lib from the json object file
const chai = require('chai');
//adding methods that chai requires
const should = chai.should();
const expect = require('chai').expect;
const assert = require('chai').assert;

//linking the functions.js file from the parent folder where we will have a class
const Functions = require("../public/js/functions");
const func = new Functions();

//first unit test
describe("Demo", () => {
    it("should return a number", (done) => {
        func.getRandomNumber()
            .then(result => {
                console.log(result);
                result.should.be.an("number");
                done();
            })
    });

    it("should return my name", (done) => {
        func.returnMyName("Andreea")
            .then(result => {
                result.should.equal("Andreea");
                done();
            });
    });

    it("should check if it is true", (done) => {
        expect(func.truthyFunction("truth")).to.be.ok;
        done();
    });

    it("should return the difference", (done) => {
        func.diffBetweenNumbers(3,5)
            .then(result => {
                console.log(result);
                result.should.be.a("number");
                done();
            })
    });

    it("should check if the second number is greater", (done) => {
        assert.isAbove(func.compareNumbers(2,5), 0);
        done();
    });

    it("should find a number in an array", (done) => {
        assert.include(func.searchForTheNeedle([1,2,3,4,5],3),"num was found");
        done();
    });

    it("should check if it is an object",(done) => {
        assert.isObject(func.isAnObject({tea: 'green', coffee: 'mocha'}),"it is an obj");
        expect(func.isAnObject({tea: 'green', coffee: 'mocha'})).to.have.property("tea");
        done();
    });
});