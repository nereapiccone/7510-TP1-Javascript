var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');

describe("Interpreter", function () {

    var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });

    describe('Interpreter errors', function () {

        it('hijo(pepe, juan) should be false', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === false);
        });
        it('hija(maria, roberto) should be false', function () {
            assert(interpreter.checkQuery('hija(maria, roberto)') === false);
        });
        it('hijo(pepe, juan) should be false', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') == false);
        });

        it('hija(maria, alfonso) should be false', function () {
            assert(interpreter.checkQuery('hija(maria, alfonso)') === false);
        });
    });

});
