var metadata = { "author": "Lisandro Ronconi",
    "name": "Oculta/muestra los comentarios",
    "description": "Este refactoring oculta los comentarios y con un link permite mostrarlos",
    "id":"resumencomentarios-Facebook-licha"};

function getAccessibilityAugmenter(){
    return new FacebookResume();
};

function FacebookResume() {

};

FacebookResume.prototype = new AbstractInstanceRefactoring();

FacebookResume.prototype.setTargetURLs = function () {
    this.addTargetURL(/https:\/\/www.facebook.com\//);
};

FacebookResume.prototype.initialize = function (language) {
    this.abstract_refactoring = new ResumeRefactoring.ResumeRefactoring("comentariosfacebook");
    this.abstract_refactoring.setCaption("Ver comentarios");
    this.abstract_refactoring.ocultarNodo(".//*[@class='uiUfi UFIContainer _5pc9']");
};
