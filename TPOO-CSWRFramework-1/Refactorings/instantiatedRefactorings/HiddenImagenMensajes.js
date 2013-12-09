var metadata = {"author":"Lisandro Ronconi", 
                "name":"Hiden image for Facebook", 
                "description":"Este refactorin oculta las imagenes de los comentarios",
                "id": "HidenImageMensajes-facebook-licha"
            };

function getAccessibilityAugmenter(){
    return new HiddenImagenMensajes();
};



function HiddenImagenMensajes(){

};

HiddenImagenMensajes.prototype = new AbstractInstanceRefactoring();

HiddenImagenMensajes.prototype.setTargetURLs = function(){
    this.addTargetURL(/https:\/\/www.facebook.com\/messages/);
};



//override
HiddenImagenMensajes.prototype.adaptDocument = function (doc) {
    this.abstract_refactoring.adaptDocument(doc);
};




HiddenImagenMensajes.prototype.initialize = function (language) {
    this.abstract_refactoring = new HiddenRedundantOperationRefactoring.HiddenRedundantOperationRefactoring("Facebook page");
    //IMG

    this.abstract_refactoring.addClassAborrar(".img"); //quien hizo el estado
};

HiddenImagenMensajes.prototype.initRefactoringForPageLoaded = function(doc,language){
	
};
