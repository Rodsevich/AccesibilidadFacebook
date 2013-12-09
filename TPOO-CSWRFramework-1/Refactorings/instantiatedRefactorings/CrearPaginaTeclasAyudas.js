var metadata = { "author": "Maximiliano, Andres, Lisandro",
    "name": "Crear pagina ayuda",
    "description": "Este refactoring crea la pagina de ayuda en las teclas de atajos",
    "id": "crearpaginaayuda-maxiandreslicha"
};

function getAccessibilityAugmenter(){
    return new CrearPaginaTeclasAyudas();
};

function CrearPaginaTeclasAyudas(){

};

CrearPaginaTeclasAyudas.prototype = new AbstractInstanceRefactoring();

CrearPaginaTeclasAyudas.prototype.setTargetURLs = function(){
    this.addTargetURL(/https:\/\/www.facebook.com\/comandos\/ayuda\/teclas*/); 
};

CrearPaginaTeclasAyudas.prototype.initialize = function (language) {

    var refactoring = new CrearPaginaRefactoring.CrearPaginaRefactoring("Facebook page");
    refactoring.setText(
    //al agregar mas teclas de atajo, modificar aqui el manualsito
        "<div>" +
            "<a onclick=\"document.location.href='https://www.facebook.com'\" href=\"#\">volver</a>"+
        "</div>" +
        "<div>"+
            "<ul>"+
                "<li> <span>A</span>  <span>Baja un comentario</span> </li>" +
                "<li> <span>B</span>  <span>salta un comentario</span> </li>" +
                "<li> <span>C</span>  <span>sube un comentario</span> </li>" +
            "</ul>" +
        "</div>"+
        "<div>" +
            "<a onclick=\"document.location.href='https://www.facebook.com'\" href=\"#\">volver</a>"+
        "</div>"
    );
    this.abstract_refactoring = refactoring;
};

CrearPaginaTeclasAyudas.prototype.initRefactoringForPageLoaded = function(doc,language){
	
};

//override
CrearPaginaTeclasAyudas.prototype.adaptDocument = function (doc) {
    this.abstract_refactoring.adaptDocument(doc);
};
