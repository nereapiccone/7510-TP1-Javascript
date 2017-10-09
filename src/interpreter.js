// A fact is composed by relations and names
function Fact(fact) {
	this.relation	= fact.substring(0, fact.indexOf("("));;
	this.names 		= fact.substring(fact.indexOf("(") + 1, fact.indexOf(")"));

	this.getRelation = function( ) {
		return relation;
	};

}

function Rule(rule) {
	
	this.relation 	= rule.substring(0, rule.indexOf("("));
	this.names 		= rule.substring(rule.indexOf("(") + 1, rule.indexOf(")"));;
	this.facts 		= rule.substring(rule.indexOf(":-") + 2, rule.indexOf(").") +1);;

	// Reorder facts from rules.-
	this.getFactsFromRules = function(names){

		var namesToMap = names.split(",");
		var parametersToMap = this.names.split(",");
		
		//remove spaces
		namesToMap = namesToMap.map(function (str) {
			return str.trim();
		})
		parametersToMap = parametersToMap.map(function (str) {
			return str.trim();
		})

		var result = this.facts;
		for (var i = 0; i < namesToMap.length; i++) {
		 	result = result.replace(new RegExp(parametersToMap[i], 'g'), namesToMap[i]);
		}

		return result;
	}
}

function Parser(){

	this.mapFactsAndRules = function(params){
		params.map(this.isFactOrIsARule);
	}

	// Check if parameter is a fact.-
	var isAFact = function(sentence){
		if (sentence.search(":-") == -1){
			return true;
		}
		return false;
	}

	// Check if parameter is a rule.-
	this.isFactOrIsARule = function(sentence){
		if (isAFact(sentence)) {
			addFact(sentence);
		}else{
			addRule(sentence);
		}
	}

	// Managing all facts and rules.-
	var facts = [];
	var rules = [];

	// Add fact to our list.-
	var addFact = function(fact){
		var createFact = new Fact(fact);
		facts.push(createFact);
	}

	// Add rule to our list.-
	var addRule = function(rule){
		var createRule = new Rule(rule);
		rules.push(createRule); 
	}

	//True if fact is in the sequence.-	
	this.processFact = function(relation, names){
		for (var i = 0; i < facts.length; i++) {
			if (facts[i].relation == relation && facts[i].names == names){
				return true;
			}
		}
		return false;
	}

	//True if rule is in the sequence.-	
	this.processRule = function(relation, names){
		var result = false;
		
		for (var i = 0; i < rules.length; i++) {	

			if (rules[i].relation == relation){
				var factsInRules = rules[i].getFactsFromRules(names);
				 	factsInRules = factsInRules.split("),");
				
				for (var i = 0; i < factsInRules.length; i++) {
					var fact = factsInRules[i];
					fact = fact.trim();
					if (fact[fact.length - 1] != ")"){
						fact += ")"; //Add parenthesis 
					}

					var relation 	= this.getRelations(fact);
					var names 		= this.getNames(fact);

					if (this.processFact(relation, names)){
						result = true;
					}else{
						result = false;
						break;
					}
				}
				return result;
			}
		}
		return result;
	}

	// Return relationship between the actors.-
	this.getRelations = function(sentence){
		return sentence.substring(0, sentence.indexOf("("));
	}

	// Return names of the actors.-
	this.getNames = function(sentence){
		return sentence.substring(sentence.indexOf("(") + 1, sentence.indexOf(")"));
	}
}
 
var Interpreter = function () {

	var parser = new Parser();

	this.parseDB = function (params) {
    	parser.mapFactsAndRules(params);
    }

    this.checkQuery = function (params) {
        var relation = parser.getRelations(params);
		var names 	 = parser.getNames(params);
		
		var result = false;
		if (parser.processFact(relation, names)){
			return true;
		}else{
			return parser.processRule(relation, names);
		}
    }  

}

module.exports = Interpreter;