var metadata = { "author": "Lisandro",
    "name": "Inserta codigo css",
    "description": "Este refactoring generico permite insertar codigo css puro",
    "id": "InsertStyleCss-lichamaxi"
};

function InsertStyleCss(name) {
	this.name = name;
	this.codigoCss = [];
};

InsertStyleCss.prototype = new AbstractGenericRefactoring();

InsertStyleCss.prototype.adaptDocument = function(doc){
    this.agregarEstilo(doc);
};

//codigo: Codigo con sintaxis CSS
InsertStyleCss.prototype.addcodigo = function (codigo) {
    this.codigoCss.push(codigo);
};

InsertStyleCss.prototype.agregarEstilo = function (doc) {
    var hoja = doc.createElement('style');
    for (var i = 0; i < this.codigoCss.length; i++) {
        hoja.innerHTML += " " + this.codigoCss[i] + " ";
    }
    doc.body.appendChild(hoja);
};

var exportedObjects = {"GenericRefactoring":InsertStyleCss};
