var metadata = { "author": "Lisandro Ronconi",
    "name": "Oculta los comentarios de fecebook",
    "description": "Este refactoring oculta los comentarios de los estados",
    "id":"hiddencomentarios-Facebook-licha"};

function getAccessibilityAugmenter(){
    return new FacebookHiddenComentarios();
};

function FacebookHiddenComentarios() {

};

FacebookHiddenComentarios.prototype = new AbstractInstanceRefactoring();

FacebookHiddenComentarios.prototype.setTargetURLs = function () {
    this.addTargetURL(/https:\/\/www.facebook.com\//);
};


//override
FacebookHiddenComentarios.prototype.adaptDocument = function (doc) {
    if (doc.body.getAttribute("class").indexOf("home") > -1) {
        //esta en el muro de alguien logueado
        this.abstract_refactoring.adaptDocument(doc);
    }
};



FacebookHiddenComentarios.prototype.initialize = function (language) {
    this.abstract_refactoring = new HiddenRedundantOperationRefactoring.HiddenRedundantOperationRefactoring("Facebook page");
    this.abstract_refactoring.addClassAborrar(".uiUfi.UFIContainer");
};
