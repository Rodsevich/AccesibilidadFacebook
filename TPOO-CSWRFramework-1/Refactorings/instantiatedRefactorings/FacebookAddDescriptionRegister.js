var metadata = { "author": "Andres, MAximiliano, Lisandro",
    "name": "Agrega labela a imputs del registrar",
    "description": "Este refactoring agrega los labels de los imputs" +
                    " usados en el formulario de registro de personas",
    "id":"adddescriptionregister-Facebook-lichaMaxiAndres"};

function getAccessibilityAugmenter(){
    return new FacebookAddDescriptionRegister();
};

function FacebookAddDescriptionRegister() {

};

FacebookAddDescriptionRegister.prototype = new AbstractInstanceRefactoring();

FacebookAddDescriptionRegister.prototype.setTargetURLs = function () {
    this.addTargetURL(/https:\/\/www.facebook.com\//);
};

FacebookAddDescriptionRegister.prototype.initialize = function (language) {
    this.abstract_refactoring = new AddDescription.AddDescription("Facebook register page");
    this.abstract_refactoring.addLabels(".//*[@id='u_0_0']", "Nombre");
    this.abstract_refactoring.addLabels(".//*[@id='u_0_1']", "Apellido");
    this.abstract_refactoring.addLabels(".//*[@id='u_0_2']", "E-Mail");
    this.abstract_refactoring.addLabels(".//*[@id='u_0_3']", "Repita su E-Mail");
    this.abstract_refactoring.addLabels(".//*[@id='u_0_4']", "Contraseña");
    
};

FacebookAddDescriptionRegister.prototype.adaptDocument = function (doc) {
    if (doc.body.getAttribute("class").indexOf("fbIndex UIPage_LoggedOut") > -1) {
        //esta en la página de logueo/registro
        this.abstract_refactoring.adaptDocument(doc);
    }
};
