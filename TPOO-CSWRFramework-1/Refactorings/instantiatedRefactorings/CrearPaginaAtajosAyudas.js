var metadata = { "author": "Maximiliano, Andres, Lisandro",
    "name": "Crear pagina ayuda",
    "description": "Este refactoring crea la pagina de ayuda en las atajos de atajos",
    "id": "crearpaginaayuda-maxiandreslicha"
};

function getAccessibilityAugmenter(){
    return new CrearPaginaAtajosAyudas();
};

function CrearPaginaAtajosAyudas(){

};

CrearPaginaAtajosAyudas.prototype = new AbstractInstanceRefactoring();

CrearPaginaAtajosAyudas.prototype.setTargetURLs = function(){
    this.addTargetURL(/https:\/\/www.facebook.com\/comandos\/ayuda\/atajos*/); 
};

CrearPaginaAtajosAyudas.prototype.initialize = function (language) {

    var refactoring = new CrearPaginaRefactoring.CrearPaginaRefactoring("Facebook page");
    refactoring.setText(
    //al agregar mas atajos de atajo, modificar aqui el manualsito
        "<link href=\"https://raw.github.com/apexskier/CSS-Keyboard/master/css/style.css\" media=\"all\" rel=\"stylesheet\" type=\"text/css\" />" +
        "<div>" +
            "<a onclick=\"document.location.href='https://www.facebook.com'\" href=\"#\">volver</a>"+
        "</div>" +
        "<div>"+
            "<ul>"+
                "<li> <span><strong>k</strong></span>       <span>Lee noticia de arriba</span> </li>" +
                "<li> <span><strong>j</strong></span>       <span>Lee noticia de abajo</span> </li>" +
                //A agregar después, ni ganas...
//                "<li> <span><strong>Flecha Derecha</strong></span>      <span>Lee comentario siguiente</span> </li>" +
//                "<li> <span><strong>Flecha Izquierda</strong></span>    <span>Lee comentario anterior</span> </li>" +
                "<li> <span><strong>Alt + Shift + M</strong></span>     <span> Nuevo mensaje</span> </li> " +
                "<li> <span><strong>c</strong></span>                   <span>para comentar cuando est&aacute;s en una historia de la secci&oacute;n de noticias</span> </li> " +
//                "<li> <span><strong>j y k</strong></span>      		<span> para desplazarte por las historias de la secci&oacute;n de noticias</span> </li> " +
                "<li> <span><strong>l</strong></span>           	<span> para indicar que te gusta o que ya no te gusta una historia seleccionada.</span> </li> " +
//                "<li> <span><strong>q</strong></span>           	<span>para buscar a un amigo con el que quieres chatear</span> </li> " +
                "<li> <span><strong>p</strong></span>                   <span>para enfocar el cuadro de texto al realizar una publicaci&oacute;n</span> </li> " +
                "<li> <span><strong>/</strong></span>                   <span> B&uacute;squeda</span> </li> " +
                
                "<li> <span><strong>Alt + Shift + 0</strong></span>	<span>Ayuda</span> </li> " +
                "<li> <span><strong>Alt + Shift + 1</strong></span>	<span>Inicio</span> </li> " +
                "<li> <span><strong>Alt + Shift + 2</strong></span>	<span>Biograf&iacute;a</span> </li> " +
                "<li> <span><strong>Alt + Shift + 3</strong></span>	<span>Amigos</span> </li> " +
                "<li> <span><strong>Alt + Shift + 4</strong></span>	<span>Bandeja de entrada</span> </li> " +
                "<li> <span><strong>Alt + Shift + 5</strong></span>	<span>Notificaciones</span> </li> " +
                "<li> <span><strong>Alt + Shift + 6</strong></span>	<span>Configuraci&oacute;n de la cuenta</span> </li> " +
                "<li> <span><strong>Alt + Shift + 7</strong></span>	<span>Privacidad</span> </li> " +
                "<li> <span><strong>Alt + Shift + 8</strong></span>	<span>Acerca de</span> </li> " +
                "<li> <span><strong>Alt + Shift + 9</strong></span>	<span>Condiciones</span> </li> " +


/*      ESTOS NO ANDAN
                "<li> <span><strong>Ctrl + g</span></strong>		<span>para buscar conversaciones</span> </li> " +
                "<li> <span><strong>Ctrl + q</span></strong>		<span>para mostrar u ocultar los atajos de teclado</span> </li> " +
                "<li> <span><strong>Ctrl + Supr</span></strong>		<span>para archivar o desarchivar una conversaci&oacute;n</span> </li> " +
                "<li> <span><strong>Ctrl + j</span></strong>		<span>para marcar como correo no deseado</span> </li> " +
                "<li> <span><strong>Ctrl + c</span></strong>		<span>para redactar un mensaje nuevo</span> </li> " +
                "<li> <span><strong>Ctrl + i</span></strong>		<span>para ir a la bandeja de entrada</span> </li> " +
                "<li> <span><strong>Ctrl + u</span></strong>		<span>para ir a \"Otros\"</span> </li> " +
*/
            "</ul>" +
        "</div>"+
        "<div>" +
            "<a onclick=\"document.location.href='https://www.facebook.com'\" href=\"#\">volver</a>"+
        "</div>"
    );
    this.abstract_refactoring = refactoring;
};

CrearPaginaAtajosAyudas.prototype.initRefactoringForPageLoaded = function(doc,language){
	
};

//override
CrearPaginaAtajosAyudas.prototype.adaptDocument = function (doc) {
    this.abstract_refactoring.adaptDocument(doc);
};
