var metadata = { "author": "Lisandro Ronconi", "name": "Hidden Redundant Operation",
                "description": "Este refactorin setea la class como no visible (visibility:hidden)",
                "id":"hiddenredundantoperation-licha"};

function HiddenRedundantOperationRefactoring(name) {
	this.name = name;
	this.elementosAocultar = [];
};

HiddenRedundantOperationRefactoring.prototype = new AbstractGenericRefactoring();

HiddenRedundantOperationRefactoring.prototype.adaptDocument = function(doc){
    this.ocultarElementos(doc);
};

//classCss: class en el <tyle> css
HiddenRedundantOperationRefactoring.prototype.addClassAborrar = function(classCss){
    this.elementosAocultar.push(classCss);
};

HiddenRedundantOperationRefactoring.prototype.ocultarElementos = function (doc) {
    var hoja = doc.createElement('style');
    for (var i = 0; i < this.elementosAocultar.length; i++) {
        hoja.innerHTML += this.elementosAocultar[i] + "{visibility:hidden} ";
    }
    doc.body.appendChild(hoja);
};

var exportedObjects = {"GenericRefactoring":HiddenRedundantOperationRefactoring};
