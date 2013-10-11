var metadata = { "author": "Lisandro, Maximiliano",
    "name": "Quita los estilos css a objetos",
    "description": "Este refactoring generico permite expecificar objetos del dom a los que se les quitara el estilo",
    "id": "RemoveStyleCss-lichamaxi"
};

function RemoveStyleCss(name) {
	this.name = name;
	this.elements_for_removing = [];
	this.estiloPorElemento = [];
};

RemoveStyleCss.prototype = new AbstractGenericRefactoring();

RemoveStyleCss.prototype.adaptDocument = function(doc){
	this.removeElements(doc);
};

//xpath sobre el que se aplica el refactory
//estilo expecifica el estilo que se removera
RemoveStyleCss.prototype.addEstilo = function (xpath, estilo) {
    this.elements_for_removing[xpath] = xpath;
    this.estiloPorElemento[xpath] = estilo;
};

RemoveStyleCss.prototype.removeElements = function (doc) {
    //var elements_for_removing = [];
    for (var i = 0; i < this.elements_for_removing.length; i++) {
        var dom_target_elements = doc.evaluate(this.elements_for_removing[i], doc, null, XPathResult.ANY_TYPE, null);
        var element = dom_target_elements.iterateNext();
        while (element) {
            //elements_for_removing.push(element);
            element.removeAttribute(this.estiloPorElemento[ this.elements_for_removing[i]] );
            element = dom_target_elements.iterateNext();
        }
    }

    /*for (var i = 0;i < elements_for_removing.length;i++)
    elements_for_removing[i].parentNode.removeChild(elements_for_removing[i]);*/
};

var exportedObjects = {"GenericRefactoring":RemoveStyleCss};
