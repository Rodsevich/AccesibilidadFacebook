var metadata = {"author":"Nico", 
                "name":"Navegacion Feisbuc", 
                "description":"Agrega manejo de navegacion por teclado de Feisbuc",
                "id":"navegacion-feisbuc"};

function getAccessibilityAugmenter(){
    return new NavegacionFeisbuc();
};


function ando(){
    alert(this); //document
};

function documento(){
    alert(document);//[object XULDocument]
};

function windowo(){
    alert(window);//[object ChromeWindow]
};


function leerAjoba(){
    this.leibles = this.getElementsByClassName("_5pax");
    if(this.posicion_lectura == undefined) this.posicion_lectura = 0;
        if(this.posicion_lectura < this.leibles.length - 1){
//            leer_leible(++this.posicion_lectura);
            var range = this.createRange();
            var seleccion = this.getSelection();
            range.selectNodeContents(this.leibles[++this.posicion_lectura]);
            seleccion.removeAllRanges();
            seleccion.addRange(range);
        }
}

function leerArriba(){
    this.leibles = this.getElementsByClassName("_5pax");
    if(this.posicion_lectura == undefined) this.posicion_lectura = 0;
        if(this.posicion_lectura > 0){
//            leer_leible(--this.posicion_lectura);
            var range = this.createRange();
            var seleccion = this.getSelection();
            range.selectNodeContents(this.leibles[--this.posicion_lectura]);
            seleccion.removeAllRanges();
            seleccion.addRange(range);
        }
}

function leer_leible(pos){
    leer(this.leibles[pos]);
}

function leer(elemento){
    var range = this.createRange();
    var seleccion = this.getSelection();
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
    observer.addCombo("Ctrl + Alt + D", documento);
    observer.addCombo("Ctrl + Alt + W", windowo);
    observer.addCombo("down", leerAjoba);
    observer.addCombo("up", leerArriba);
    this.abstract_refactoring = observer;
};

//override
NavegacionFeisbuc.prototype.adaptDocument = function (doc) {
    if (doc.body.getAttribute("class").indexOf("home") > -1) {
        //esta en el muro de alguien logueado
        this.abstract_refactoring.adaptDocument(doc);
    }
};