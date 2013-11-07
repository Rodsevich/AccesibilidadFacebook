var metadata = {"author":"Lisandro Ronconi", 
                "name":"Hiden image for Facebook", 
                "description":"Este refactorin oculta las imagenes de los comentarios",
                "id": "HidenImage-facebook-licha"
            };

function getAccessibilityAugmenter(){
    return new HiddenImagenComentario();
};



function HiddenImagenComentario(){

};

HiddenImagenComentario.prototype = new AbstractInstanceRefactoring();

HiddenImagenComentario.prototype.setTargetURLs = function(){
    this.addTargetURL(/https:\/\/www.facebook.com\/*/);
};



//override
HiddenImagenComentario.prototype.adaptDocument = function (doc) {
    if (doc.body.getAttribute("class").indexOf("home") > -1) {
        //esta en el muro de alguien logueado
        this.abstract_refactoring.adaptDocument(doc);
    }
};




HiddenImagenComentario.prototype.initialize = function (language) {
    this.abstract_refactoring = new HiddenRedundantOperationRefactoring.HiddenRedundantOperationRefactoring("Facebook page");
    //IMG
    this.abstract_refactoring.addClassAborrar(".actorPhoto.lfloat"); //quien hizo el estado
    this.abstract_refactoring.addClassAborrar(".substoryActorPic.lfloat"); //cuando aparece que alguien comento SU comentario

    this.abstract_refactoring.addClassAborrar(".UFIRow.UFIComment.display .clearfix .lfloat"); // comentario dentro del estado

    //img de "escriba un comentario"
    this.abstract_refactoring.addClassAborrar(".UFIRow.UFIAddComment.UFIAddCommentWithPhotoAttacher.UFILastComponent div .lfloat");
};

HiddenImagenComentario.prototype.initRefactoringForPageLoaded = function(doc,language){
	
};
