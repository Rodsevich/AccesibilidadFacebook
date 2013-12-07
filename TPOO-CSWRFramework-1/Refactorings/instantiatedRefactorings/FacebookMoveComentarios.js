var metadata = { "author": "Andres, Lisandro",
    "name": "Agrega el link",
    "description": "Crea un link 'Ver estado con comentarios'",
    "id":"movecomentarios-Facebook-lichaAndres"};

function getAccessibilityAugmenter(){
    return new FacebookMoveComentarios();
};

function FacebookMoveComentarios() {

};

FacebookMoveComentarios.prototype = new AbstractInstanceRefactoring();

FacebookMoveComentarios.prototype.setTargetURLs = function () {
    this.addTargetURL(/https:\/\/www.facebook.com\//);
};


//override
FacebookMoveComentarios.prototype.adaptDocument = function (doc) {
    if (doc.body.getAttribute("class").indexOf("home") > -1) {
        //esta en el muro de alguien logueado
        this.abstract_refactoring.adaptDocument(doc);
    }
};


FacebookMoveComentarios.prototype.initialize = function (language) {
    var refactoring = new DistributeMenu.DistributeMenu("Facebook page");
    refactoring.setItemXpath(".//span[@class='uiStreamFooter']");

    var archive_operation = new DistributeMenu.DistributedOperation("Ver comentarios", refactoring);
    archive_operation.setAction(".//span[@class='uiStreamFooter']/span[@class='uiStreamSource']/a");

    this.abstract_refactoring = refactoring;
};
