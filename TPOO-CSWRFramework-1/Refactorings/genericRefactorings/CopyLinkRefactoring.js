var metadata = { "author": "Lisandro Ronconi", "name": "copy link",
                "description": "Este refactorin copy los link y cambi sus caption",
                "id": "copylinkrefactoring-licha"
            };

function CopyLinkRefactoring(name) {
	this.name = name;
	this.elementosAocultar = [];
	this.padres = [];
	this.captions = [];
};

CopyLinkRefactoring.prototype = new AbstractGenericRefactoring();

CopyLinkRefactoring.prototype.adaptDocument = function(doc){
    this.copiarLink(doc);
};

//elemento : Xpath del link
//padreDe: se crea como hijo de...
//caption: Nuevo caption del link
CopyLinkRefactoring.prototype.addLink = function (elemento, padreDe, caption) {
    this.elementosAocultar.push(elemento);
    this.padres.push(padreDe);
    this.captions.push(caption);
};

CopyLinkRefactoring.prototype.copiarLink = function (doc) {
    var elements_for_copy = [];
    var padres_auxiliar = [];
    var caption_auxiliar = [];
    for (var i = 0; i < this.elementosAocultar.length; i++) {
        var dom_target_elements = doc.evaluate(this.elementosAocultar[i], doc, null, XPathResult.ANY_TYPE, null);
        var element = dom_target_elements.iterateNext();
        while (element) {
            elements_for_copy.push(element);
            padres_auxiliar.push(this.padres[i]); //el dom no se puede modificar. Asi q se guarda en variables auxiliares
            caption_auxiliar.push(this.captions[i]);
            element = dom_target_elements.iterateNext();
        }
    }

    for (var i = 0; i < elements_for_copy.length; i++) {
        var nuevo = elements_for_copy[i].cloneNode();
        nuevo.innerHTML = caption_auxiliar[i];

        //prosesa xPath del padre
        var dom_target_elements = doc.evaluate(padres_auxiliar[i], doc, null, XPathResult.ANY_TYPE, null);
        var element = dom_target_elements.iterateNext();

        //mapea con el numero cont
        var cont = 0;
        while (element && cont < i) {
            element = dom_target_elements.iterateNext(); cont++;
        }
        if (element) {
            var n1 = nuevo.cloneNode();
            element.appendChild(n1);
        }
    }
};

var exportedObjects = {"GenericRefactoring":CopyLinkRefactoring};
