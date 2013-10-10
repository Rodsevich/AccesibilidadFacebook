var metadata = {"author":"Sergio Firmenich", "name":"Remove Redundant Operation", "description":"This generic refactoring romove those operation which are mark as repeated in a Web page.","id":"removeredundantoperation-sfirmenich"};

function RemoveRedundantOperationRefactoring(name){
	this.name = name;
	this.elements_for_removing = [];
};

RemoveRedundantOperationRefactoring.prototype = new AbstractGenericRefactoring();

RemoveRedundantOperationRefactoring.prototype.adaptDocument = function(doc){
	this.removeElements(doc);
};

RemoveRedundantOperationRefactoring.prototype.addRedundantOperation = function(aXpath){
	this.elements_for_removing.push(aXpath);
};

RemoveRedundantOperationRefactoring.prototype.removeElements = function(doc){	
	var elements_for_removing = [];
	for (var i = 0;i < this.elements_for_removing.length;i++){
		var dom_target_elements = doc.evaluate(this.elements_for_removing[i], doc, null, XPathResult.ANY_TYPE, null);
		var element = dom_target_elements.iterateNext();
		while (element) {
			elements_for_removing.push(element);
			element = dom_target_elements.iterateNext();			
		}
	}
	
	for (var i = 0;i < elements_for_removing.length;i++)
		elements_for_removing[i].parentNode.removeChild(elements_for_removing[i]);
};

var exportedObjects = {"GenericRefactoring":RemoveRedundantOperationRefactoring};
