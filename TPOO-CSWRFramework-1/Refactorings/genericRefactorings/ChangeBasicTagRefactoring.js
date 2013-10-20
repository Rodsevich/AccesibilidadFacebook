var metadata = { "author": "Lisandro Ronconi",
    "name": "Cambia tag sin atributos por otro tag", 
            "description":"Este refactorin permite cambiar los tag por otros."+
            "No tiene en cuenta los atributos, solo los nombre de tag. Ej <h5> por <label>",
            "id":"chagebasictag-licha"};

function ChangeBasicTagRefactoring(name){
	this.name = name;
	this.elementoAreemplazar = [];
	this.tag = [];
};

ChangeBasicTagRefactoring.prototype = new AbstractGenericRefactoring();

ChangeBasicTagRefactoring.prototype.adaptDocument = function(doc){
    this.changeTag(doc);
};

//aXpath: xpath del elemento
//nuevoTag: nuevo tag a usar, Ej: "label", "h5"
ChangeBasicTagRefactoring.prototype.addElements = function (aXpath, nuevoTag) {
    this.elementoAreemplazar.push(aXpath);
    this.tag.push(nuevoTag);
};

ChangeBasicTagRefactoring.prototype.changeTag = function (doc) {

    for (var indice = 0; indice < this.elementoAreemplazar.length; indice++) {
        var dom_target_elements = doc.evaluate(this.elementoAreemplazar[indice], doc, null, XPathResult.ANY_TYPE, null);
        var elementos = []
        var h5 = dom_target_elements.iterateNext();
        while (h5) {
            elementos.push(h5);
            h5 = dom_target_elements.iterateNext();
        }
        for (var num = 0; num < elementos.length; num++) {
            var h5 = elementos[num];
            var hijos = h5.childNodes;
            var padre = h5.parentNode;
            var nuevo = doc.createElement(this.tag[indice]);
            for (var i = 0; i < hijos.length; i++) {
                var clon = hijos[i].cloneNode();
                nuevo.appendChild(clon);
            }

            padre.insertBefore(nuevo, h5);
            padre.removeChild(h5);
        }
    }
};

var exportedObjects = {"GenericRefactoring":ChangeBasicTagRefactoring};
