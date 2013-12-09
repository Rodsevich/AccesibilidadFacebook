var metadata = { "author": "Maximiliano, Andres, Lisandro",
    "name": "Crear pagina",
    "description": "Este refactoring borra el body de la pagina y crea otra pagina con el texto especifico",
    "id": "crearpagina-maxiandreslicha"
};

function CrearPaginaRefactoring(name) {
	this.name = name;
	this.texto = "";
};

CrearPaginaRefactoring.prototype = new AbstractGenericRefactoring();

CrearPaginaRefactoring.prototype.adaptDocument = function(doc){
    this.crearPagina(doc);
};

//setea el texto del q se arma la pagina
CrearPaginaRefactoring.prototype.setText = function (texto) {
    this.texto = texto;
};

CrearPaginaRefactoring.prototype.crearPagina = function (doc) {
    doc.body.innerHTML = this.texto;
};

var exportedObjects = {"GenericRefactoring":CrearPaginaRefactoring};
