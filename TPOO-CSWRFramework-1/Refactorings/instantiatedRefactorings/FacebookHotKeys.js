var metadata = {"author":"Nico", 
                "name":"Navegacion Feisbuc", 
                "description":"Agrega manejo de navegacion por teclado de Feisbuc",
                "id":"navegacion-feisbuc"};

function getAccessibilityAugmenter(){
    return new NavegacionFeisbuc();
};

//En las funciones declaradas en este ámbito, el this viene a ser el document de la página

function leerAjoba(){
//    this.leibles = this.getElementsByClassName("_5pax");
//    if(this.posicion_lectura === undefined) this.posicion_lectura = 0;
//        if(this.posicion_lectura < this.leibles.length - 1){
////            leer_leible(++this.posicion_lectura);
//            var range = this.createRange();
//            var seleccion = this.getSelection();
//            range.selectNodeContents(this.leibles[++this.posicion_lectura]);
//            seleccion.removeAllRanges();
//            seleccion.addRange(range);
//        }
//    console.log("entró a leerAjoba()");
    this.leer_seleccionado(this);
}

function leerArriba(){
//    console.log("entró a leerArriba()");
//    this.leibles = this.getElementsByClassName("_5pax");
//    if(this.posicion_lectura === undefined) this.posicion_lectura = 0;
//        if(this.posicion_lectura > 0){
////            leer_leible(--this.posicion_lectura);
//            var range = this.createRange();
//            var seleccion = this.getSelection();
//            range.selectNodeContents(this.leibles[--this.posicion_lectura]);
//            seleccion.removeAllRanges();
//            seleccion.addRange(range);
//        }
    this.leer_seleccionad(this);
}

function NavegacionFeisbuc(){
    
};

NavegacionFeisbuc.prototype = new AbstractInstanceRefactoring();

NavegacionFeisbuc.prototype.initRefactoringForPageLoaded = function(doc,language){
    
    //En esta función el framework hace cambios que se pueden persistir en el document de la página si se los
    //declara con doc.wrappedJSObject.nombre_de_la_funcion = function(...args) { ... }
    
    
    //Se pueden llamar a las funciones internas declaras acá con "this.wrappedJSObject.nombre_de_la_funcion", pero pierde el this después
    
    //No se cómo poronga meter un setTimeout del reverendísimo orto que funcione... Si estoy re caliente, todo el día y el pascao sin vender...
    
    doc.wrappedJSObject.leer_seleccionado = function leer_seleccionado(doc){
        setTimeout(function() {
            this.wrappedJSObject.leer(doc.getElementsByClassName("_5qdv")[0],doc);
        },400);
//        console.log("ejecuto leer_seleccionado");
    }
    
    doc.wrappedJSObject.leer_seleccionad = function leer_seleccionad(doc){
        setTimeout(function() {
            this.wrappedJSObject.leer(doc.getElementsByClassName("_5qdv")[0],doc);
        },400);
//        console.log("ejecuto leer_seleccionad");
    }
    
    doc.wrappedJSObject.leer_leible = function leer_leible(pos){
        this.wrappedJSObject.leer(this.wrappedJSObject.leibles[pos]);
//        console.log("ejecuto leer_leible");
    }

    doc.wrappedJSObject.leer = function leer(elemento,doc){
        var range = doc.createRange();
        var seleccion = doc.getSelection();
        range.selectNodeContents(elemento);
        seleccion.removeAllRanges();
        seleccion.addRange(range);
//        console.log("ejecuto leer");
    }
    
    doc.wrappedJSObject.andaa = function andaa(){
        setTimeout(function() {this.wrappedJSObject.aler("sk")}, 2000);
//        console.log("ejecuto andaa");
    }
    doc.wrappedJSObject.anda = function anda(){
        setTimeout(function() {document.alert("p")}, 1000);
//        console.log("ejecuto anda");
    }
    doc.wrappedJSObject.pepe = function pepe(){
        this.wrappedJSObject.aler("pp");
//        console.log("ejecuto pepe");
    }
    doc.wrappedJSObject.aler = function aler(param){
        alert(param + " - " + this.wrappedJSObject);
    }
    doc.wrappedJSObject.dis = function dis(){
        return this.wrappedJSObject;
    }
    doc.wrappedJSObject.selff = function selff(){
        return this.wrappedJSObject;
    }
};

NavegacionFeisbuc.prototype.setTargetURLs = function(){
    this.addTargetURL(/https:\/\/www.facebook.com\//);
};

NavegacionFeisbuc.prototype.initialize = function() {
    var observer = new KeyboardObserver.KeyboardObserver("observer");
    observer.addCombo("j", leerAjoba);
    observer.addCombo("k", leerArriba);
//    observer.addCombo("right", leerComentarioSiguiente);
//    observer.addCombo("left", leerComentarioAnterior);
    this.abstract_refactoring = observer;
};

//override
NavegacionFeisbuc.prototype.adaptDocument = function (doc) {
    if (doc.body.getAttribute("class").indexOf("home") > -1) {
        //esta en el muro de alguien logueado
        this.abstract_refactoring.adaptDocument(doc);
    }
};