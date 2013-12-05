var metadata = {"author":"Nico", 
                "name":"Navegacion Feisbuc", 
                "description":"Agrega manejo de navegacion por teclado de Feisbuc",
                "id":"navegacion-feisbuc"};

function getAccessibilityAugmenter(){
    return new NavegacionFeisbuc();
};


function ando(){
    this.body.setAttribute("style","background-color:black;color:green;");
};


function leerAjoba(){
    if(this.leibles.length != undefined)
        if(posicion_lectura < leibles.length - 1)
            leer_leible(++posicion_lectura);
}

function leerArriba(){
    if(this.leibles.length != undefined)
        if(posicion_lectura > 0)
            leer_leible(--posicion_lectura);
}

function leer_leible(pos){
    leer(this.leibles[pos]);
}

function leer(elemento){
    var range = document.createRange();
    var seleccion = window.getSelection();
    range.selectNodeContents(elemento);
    seleccion.removeAllRanges();
    seleccion.addRange(range);
}

function NavegacionFeisbuc(){
    
};

NavegacionFeisbuc.prototype = new AbstractInstanceRefactoring();

NavegacionFeisbuc.prototype.setTargetURLs = function(){
    this.addTargetURL(/https:\/\/www.facebook.com\//);
};

NavegacionFeisbuc.prototype.initialize = function() {
    var observer = new KeyboardObserver.KeyboardObserver("observer");
    observer.addCombo("Ctrl + Alt + M", ando);
    observer.addCombo("down", leerAjoba);
    observer.addCombo("up", leerArriba);
    this.abstract_refactoring = observer;
};

//override
NavegacionFeisbuc.prototype.adaptDocument = function (doc) {
    if (doc.body.getAttribute("class").indexOf("home") > -1) {
        //esta en el muro de alguien logueado
        this.abstract_refactoring.adaptDocument(doc);
        doc.leibles = document.getElementsByClassName("_5pax");
    }
};