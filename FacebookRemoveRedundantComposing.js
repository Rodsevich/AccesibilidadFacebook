var metadata = {"author":"Sergio Firmenich", "name":"Remove Redundant for Gmail's Compose", "description":"This refactoring removes the first occurrences of the operations send, save and discard","id":"removeRedundant-mainGmail-sfirmenich"};

function getAccessibilityAugmenter(){
	return new FacebookRemoveRedundantOperations();
};

function FacebookRemoveRedundantOperations(){

};

FacebookRemoveRedundantOperations.prototype = new AbstractInstanceRefactoring();

FacebookRemoveRedundantOperations.prototype.setTargetURLs = function(){
	this.addTargetURL(/https:\/\/www.facebook.com\//);
};

FacebookRemoveRedundantOperations.prototype.initialize = function(language){
		this.abstract_refactoring = new RemoveRedundantOperationRefactoring.RemoveRedundantOperationRefactoring("UGR WebMail");
		this.abstract_refactoring.addRedundantOperation("/html/body/div/div/div/div/div/div/div/a");
		this.abstract_refactoring.addRedundantOperation("/html/body/div/div/div/div/div/div[2]/div/div/span");
		
};

