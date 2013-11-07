var metadata = { "author": "Lisandro Ronconi",
    "name": "Crea el link Ver comentario",
    "description": "Este refactoring copia el link de fecha de publicacion como ver comentario",
    "id":"copylinkcomentarios-Facebook-licha"};

function getAccessibilityAugmenter(){
    return new FacebookCopyLinkComentario();
};

function FacebookCopyLinkComentario() {

};

FacebookCopyLinkComentario.prototype = new AbstractInstanceRefactoring();

FacebookCopyLinkComentario.prototype.setTargetURLs = function () {
    this.addTargetURL(/https:\/\/www.facebook.com\/$/);//El $ indica fin de expresion, para q no se use al mostrar el comentario
};


//override
FacebookCopyLinkComentario.prototype.adaptDocument = function (doc) {
    if (doc.body.getAttribute("class").indexOf("home") > -1) {
        //esta en el muro de alguien logueado
        this.abstract_refactoring.adaptDocument(doc);
    }
};



FacebookCopyLinkComentario.prototype.initialize = function (language) {
    this.abstract_refactoring = new CopyLinkRefactoring.CopyLinkRefactoring("Facebook page");
    this.abstract_refactoring.addLink("//span[@class='uiStreamSource']/a", "//div[@class='uiUfi UFIContainer']", "Ver comentario");
};
