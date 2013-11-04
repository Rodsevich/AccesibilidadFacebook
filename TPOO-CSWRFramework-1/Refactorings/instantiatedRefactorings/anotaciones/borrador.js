//Preguntas para Sergio:
//  1_ Cómo inyectar código para que sea ejecutado bajo ciertos eventos del código JS de la página a refactorizar?
//      (en pocas palabras: Cómo extender la funcionalidad JS de la página?)
//  2_ Cómo detectar si el usuario está logeado o no para aplicar los refactorings según corresponda (si el usuario tiene la cookie o no)
//      2.1_ Se puede usar el refactoring según el valor de otras variables además de las cookies?

document.onload = function(){
    document.getElementById("reg").onsubmit = function(){
        setTimeout( function(){ selectText("error_reg_inner").focus() }, 1500) 
    };
}

function selectText(element) {
    var doc = document;
    var text = doc.getElementById(element);    

    if (window.getSelection) { // checkea compatibilidad con navegadores
        var selection = window.getSelection();            
        var range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}