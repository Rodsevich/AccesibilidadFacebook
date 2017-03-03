var metadata = {"author":"Sergio Firmenich", "name":"Information Summarizer", "description":"This generic refactoring summarize an information element structured with several subelements.","id":"summarizer-sfirmenich"};

function InformationSummarizerRefactoring(name){
	this.name = name;
	this.languages = {"es":{},"en":{}};
	this.original_xpath;
	this.summary_elements = [];
};

InformationSummarizerRefactoring.prototype = new AbstractGenericRefactoring();

InformationSummarizerRefactoring.prototype.adaptDocument = function(doc){
	this.renderSummary(doc);
};

InformationSummarizerRefactoring.prototype.setOriginalNode = function(aXpath){
	this.original_xpath = aXpath;
};

InformationSummarizerRefactoring.prototype.renderSummary = function(doc){	
	var dom_elements = doc.evaluate(this.original_xpath, doc, null, XPathResult.ANY_TYPE, null);
	//Se supone que es uno solo!
	var original_element = dom_elements.iterateNext();
	var original_id = original_element.getAttribute("id");
	if(original_id == null)
		original_id = this.name + "_original_element";
	original_element.setAttribute("id",original_id);
	var summary_container = original_element.cloneNode(true);
	summary_container.innerHTML = "";
	var summary_id = original_id+"__summarized";
	summary_container.setAttribute("id",summary_id);
	for (var i = 0;i < this.summary_elements.length;i++){
		var dom_elements = doc.evaluate(this.summary_elements[i], original_element, null, XPathResult.ANY_TYPE, null);
		var element = dom_elements.iterateNext();
		while (element) {
			var persistElement = element.cloneNode(true);
			summary_container.appendChild(persistElement);
			element = dom_elements.iterateNext();
		}
	}
	var anchor = doc.createElement("a");;
	var onclick_string = "document.getElementById('"+ original_id +"').setAttribute('style','display:show;');";
	onclick_string += "document.getElementById('"+ summary_id +"').setAttribute('style','display:none;');";
	anchor.setAttribute("href","#");
	anchor.setAttribute("onclick",onclick_string);
	anchor.innerHTML = "Ver m&aacutes informaci&oacuten";
	summary_container.appendChild(anchor);
	original_element.setAttribute("style","display: none;");
	original_element.parentNode.insertBefore(summary_container,original_element);
};

InformationSummarizerRefactoring.prototype.addToSummary = function (xpath){
	//Deben ser xpath relativos al principal
	this.summary_elements.push(xpath);
};

var exportedObjects = {"GenericRefactoring":InformationSummarizerRefactoring};
