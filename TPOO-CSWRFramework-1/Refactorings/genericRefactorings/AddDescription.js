var metadata = { "author": "Lisandro, Maximiliano",
    "name": "Agrega labels",
    "description": "Este refactoring generico permite agregar labels al DOM",
    "id": "RemoveStyleCss-lichamaxi"
};

function AddDescription(name) {
	this.name = name;
	this.elements_for_adding = [];
	this.labelAagregar = [];
};

AddDescription.prototype = new AbstractGenericRefactoring();

AddDescription.prototype.adaptDocument = function (doc) {
    this.addElements(doc);
};

//xpath del nodo padre
//label es el string a agregar
AddDescription.prototype.addLabels = function (xpath, label) {
    this.elements_for_adding[xpath] = xpath;
    this.labelAagregar[xpath] = label;
};

AddDescription.prototype.addElements = function (doc) {
    //var elements_for_removing = [];
    for (var i = 0; i < this.elements_for_adding.length; i++) {
        var dom_target_elements = doc.evaluate(this.elements_for_adding[i], doc, null, XPathResult.ANY_TYPE, null);
        var element = dom_target_elements.iterateNext();
        while (element) {
            //elements_for_removing.push(element);
            var label = document.createElement("label");
            label.appendChild(document.createTextNode(this.labelAagregar[i]));
            element.appendChild(label);
            element = dom_target_elements.iterateNext();
        }
    }

    /*for (var i = 0;i < elements_for_removing.length;i++)
    elements_for_removing[i].parentNode.removeChild(elements_for_removing[i]);*/
};

var exportedObjects = { "GenericRefactoring": AddDescription };
