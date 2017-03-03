var metadata = { "author": "Grupo facebook",
    "name": "Remover opcion de volver al registrar",
    "description": "Este refactoring quita el logo de facebook del registrar",
    "id":"removeLogoRegistrar-index-todos"};

function getAccessibilityAugmenter(){
	return new FacebookRemoveRegisterLogo();
};

function FacebookRemoveRegisterLogo(){

};

FacebookRemoveRegisterLogo.prototype = new AbstractInstanceRefactoring();

FacebookRemoveRegisterLogo.prototype.setTargetURLs = function(){
	this.addTargetURL(/https:\/\/www.facebook.com\/$/); //$ indica fin de la linea
};

FacebookRemoveRegisterLogo.prototype.initialize = function(language){
		this.abstract_refactoring = new RemoveRedundantOperationRefactoring.RemoveRedundantOperationRefactoring("Facebook");
		this.abstract_refactoring.addRedundantOperation("/html/body/div/div/div/div/div/div/div/a");
		
};

//override
FacebookRemoveRegisterLogo.prototype.adaptDocument = function (doc) {
    if (doc.body.getAttribute("class").indexOf("fbIndex UIPage_LoggedOut") > -1) {
        //esta en la página de logueo/registro
        this.abstract_refactoring.adaptDocument(doc);
    }
};