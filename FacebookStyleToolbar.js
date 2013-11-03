var metadata = {"author":"Lisandro Ronconi", 
                "name":"Quita la propiedad Fixed de la barra de herramientas Facebook", 
                "description":"Este refactorin usa el refactoring generico RemoveStyleCss para desacoplara la barra de arriva",
                "id": "styletoolbar-facebook-licha"
            };

function getAccessibilityAugmenter(){
    return new FacebookStyleToolbar();
};



function FacebookStyleToolbar(){

};

FacebookStyleToolbar.prototype = new AbstractInstanceRefactoring();

FacebookStyleToolbar.prototype.setTargetURLs = function(){
    this.addTargetURL(/https:\/\/www.facebook.com\//);
};



//override
FacebookStyleToolbar.prototype.adaptDocument = function (doc) {
    if (doc.body.getAttribute("class") == "hasLeftCol home composerExpanded fbx gecko win Locale_es_ES") {
        //esta en el muro de alguien logueado
        this.abstract_refactoring.adaptDocument(doc);
    }
};




FacebookStyleToolbar.prototype.initialize = function (language) {
    this.abstract_refactoring = new InsertStyleCss.InsertStyleCss("Facebook page");
    this.abstract_refactoring.addcodigo(" #blueBar { position:inherit !important } ");
};

FacebookStyleToolbar.prototype.initRefactoringForPageLoaded = function(doc,language){
	
};
