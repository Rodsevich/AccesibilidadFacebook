var metadata = { "author": "Lisandro Ronconi",
                    "name": "Resume informacion",
                    "description": "Este ractoring generico oculta un elemento y agrega un link para mostrarlo",
                     "id":"resumen-licha"};

function ResumeRefactoring(name) {
	this.name = name;
	this.languages = { "es": {}, "en": {} };
	this.caption = "Ver m&aacutes comentarios"; //caption de los link
	this.original_xpath;
};

ResumeRefactoring.prototype = new AbstractGenericRefactoring();

ResumeRefactoring.prototype.adaptDocument = function(doc){
	this.renderSummary(doc);
};

//setea el caption de los link
ResumeRefactoring.prototype.setCaption = function (caption) {
    this.caption = caption;
}

ResumeRefactoring.prototype.ocultarNodo = function(aXpath){
	this.original_xpath = aXpath;
};

ResumeRefactoring.prototype.renderSummary = function (doc) {

    var a = doc.evaluate(this.original_xpath, doc, null, XPathResult.ANY_TYPE, null);
    var element = a.iterateNext();
    var res = []
    //no se puede modificar el dom mientras se itera, asi q guardo en array
    while (element) {
        res.push(element);
        element = a.iterateNext();
    }

    for (var i = 0; i < res.length; i++) {
        var original_id = res[i].getAttribute("id");
        if (original_id == null)
            { original_id = this.name + "_elementoOculto_" + i; }
        var anchor = doc.createElement("a");
        anchor.innerHTML = this.caption;
        var onclick_string = "document.getElementById('" + original_id + "').setAttribute('style','display:show;');";
        anchor.setAttribute("href", "#");
        anchor.setAttribute("onclick", onclick_string);
        res[i].parentNode.insertBefore(anchor, res[i]);
        res[i].setAttribute("style", "display: none;");
    }
};



var exportedObjects = {"GenericRefactoring":ResumeRefactoring};
