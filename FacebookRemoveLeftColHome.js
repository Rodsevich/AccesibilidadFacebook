var metadata = { "author": "Lisandro Ronconi",
    "name": "Quita columna derecha en el home de fecebook",
    "description": "Este refactoring quita la barra de la derehca del home" +
                    " que tiene las publisidades",
    "id":"removeColPublisidades-Facebook-licha"};

function getAccessibilityAugmenter(){
    return new FacebookRemoveLeftColHome();
};

function FacebookRemoveLeftColHome() {

};

FacebookRemoveLeftColHome.prototype = new AbstractInstanceRefactoring();

FacebookRemoveLeftColHome.prototype.setTargetURLs = function () {
    this.addTargetURL(/https:\/\/www.facebook.com\//);
};

FacebookRemoveLeftColHome.prototype.initialize = function (language) {
    this.abstract_refactoring = new RemoveRedundantOperationRefactoring.RemoveRedundantOperationRefactoring("Facebook page");
	this.abstract_refactoring.addRedundantOperation(".//*[@id='rightCol']");
};
