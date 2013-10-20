var metadata = { "author": "Lisandro Ronconi",
    "name": "Cambia los H5 del comentario por label",
    "description": "Este refactoring cambia los tag de los comentarios, que eran H5 por Label",
    "id": "changecomentarioH5-Facebook-licha"
};

function getAccessibilityAugmenter(){
    return new ChangeComentarioH5Facebook();
};

function ChangeComentarioH5Facebook() {

};

ChangeComentarioH5Facebook.prototype = new AbstractInstanceRefactoring();

ChangeComentarioH5Facebook.prototype.setTargetURLs = function () {
    this.addTargetURL(/https:\/\/www.facebook.com\//);
};

ChangeComentarioH5Facebook.prototype.initialize = function (language) {
    this.abstract_refactoring = new ChangeBasicTagRefactoring.ChangeBasicTagRefactoring("Facebook page");
    this.abstract_refactoring.addElements(".//h5[@class='uiStreamMessage userContentWrapper']", "label");
};
