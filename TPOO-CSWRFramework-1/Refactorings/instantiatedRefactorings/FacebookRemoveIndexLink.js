var metadata = {"author":"Grupo facebook", "name":"Remover opcion de volver al inicio", "description":"Este refactoring quita la opcion inicio y el link del logo de facebok","id":"removeRedundant-index-todos"};

function getAccessibilityAugmenter(){
	return new FacebookRemoveRedundantOperations();
};

function FacebookRemoveRedundantOperations(){

};

FacebookRemoveRedundantOperations.prototype = new AbstractInstanceRefactoring();

FacebookRemoveRedundantOperations.prototype.setTargetURLs = function(){
	this.addTargetURL(/https:\/\/www.facebook.com\/$/); //$ indica fin de la linea
};

FacebookRemoveRedundantOperations.prototype.initialize = function(language){
		this.abstract_refactoring = new RemoveRedundantOperationRefactoring.RemoveRedundantOperationRefactoring("Facebook");
		this.abstract_refactoring.addRedundantOperation("//*[@id='pageLogo']");
		this.abstract_refactoring.addRedundantOperation("//*[@id='navHome']");
		
};

