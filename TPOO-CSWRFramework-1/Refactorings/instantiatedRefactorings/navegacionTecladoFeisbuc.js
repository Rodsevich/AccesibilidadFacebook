var metadata = {"author":"Nico", 
                "name":"Navegacion Feisbuc", 
                "description":"Agrega manejo de navegación por teclado de Feisbuc",
                "id":"navegacion-feisbuc"};

function getAccessibilityAugmenter(){
    return new NavegacionFeisbuc();
};

function NavegacionFeisbuc(){
	
};

NavegacionFeisbuc.prototype = new AbstractInstanceRefactoring();

NavegacionFeisbuc.prototype.setTargetURLs = function(){
    this.addTargetURL(/https:\/\/www.facebook.com\//);
};

NavegacionFeisbuc.prototype.initialize = function() {
    
    function ando(){
        alert("andó!");
    }
    
    var observer = new observerTeclado.observerTeclado("observer");
    
    observer.addCombo("Ctrl + Alt + M", ando);
    
    this.abstract_refactoring = observer;
};

NavegacionFeisbuc.prototype.initRefactoringForPageLoaded = function(doc,language){
	
};

//override
NavegacionFeisbuc.prototype.adaptDocument = function (doc) {
    function funca(){ //funcion de prueba para ver si anda
        alert("funca");
    }
    if (doc.body.getAttribute("class").indexOf("home") > -1) {
        //esta en el muro de alguien logueado
        this.abstract_refactoring.adaptDocument(doc);
    }
};
