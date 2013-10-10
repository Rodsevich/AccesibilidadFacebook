var metadata = {"author":"Sergio Firmenich", "name":"Remove Redundant for Gmail's Compose", "description":"This refactoring removes the first occurrences of the operations send, save and discard","id":"removeRedundant-mainGmail-sfirmenich"};

function getAccessibilityAugmenter(){
	return new GMailRemoveRedundantOperations();
};

function GMailRemoveRedundantOperations(){

};

GMailRemoveRedundantOperations.prototype = new AbstractInstanceRefactoring();

GMailRemoveRedundantOperations.prototype.setTargetURLs = function(){
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/\?&v=b[\w\W]*&?(st=)?[0-9]*$/);
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/\?v=b[\w\W]*&?(st=)?[0-9]*$/);
};

GMailRemoveRedundantOperations.prototype.initialize = function(language){
		this.abstract_refactoring = new RemoveRedundantOperationRefactoring.RemoveRedundantOperationRefactoring("UGR WebMail");
		this.abstract_refactoring.addRedundantOperation("html/body/table/tbody/tr/td/table[1]/tbody/tr/td[2]/form/table[1]/tbody/tr/td/input");
};
