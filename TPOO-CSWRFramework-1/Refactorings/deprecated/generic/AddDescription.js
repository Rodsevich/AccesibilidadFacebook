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

//xpath del nodo hermano derecha
//label es el string a agregar
AddDescription.prototype.addLabels = function (xpath, label) {
    this.elements_for_adding[this.elements_for_adding.length] = xpath; //agrega al final
    this.labelAagregar[this.labelAagregar.length] = label;
    return this.elements_for_adding.length;
};

AddDescription.prototype.addElements = function (doc) {

    for (var i = 0; i < this.elements_for_adding.length; i++) {
        var dom_target_elements = doc.evaluate(this.elements_for_adding[i], doc, null, XPathResult.ANY_TYPE, null);
        var element = dom_target_elements.iterateNext();
        while (element) {
            /*
            El label se inserta como hermano izquierdo del elemento en cuestión.
            Para lo cual se necesita el padre para el insert before
            */
            var padre = element.parentNode;

            //crea lebel con el texto
            var label = document.createElement("label");
            label.appendChild(document.createTextNode(this.labelAagregar[i]));

            padre.insertBefore(label, element);
            try {
                element = dom_target_elements.iterateNext();
            } catch (e) {//a veces levanta InvalidStateExeption
                element = null;
            }
        }
    }
};

var exportedObjects = { "GenericRefactoring": AddDescription };
