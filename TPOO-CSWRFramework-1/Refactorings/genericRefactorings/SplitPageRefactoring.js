var metadata = {"author":"Sergio Firmenich", "name":"Split Page", "description":"This generic refactoring splits a complex page into several smaller ones and add a menu for accessing each of these sections.","id":"splitpage-sfirmenich"};

var instance = null;
function SplitPage_loadSplitedSection(e){
	var splited_section_name = e.target.id;
	if (splited_section_name == "undefined"){
		RefactoringPersistenceManager.getInstance().setRefactoringInformation(instance,"selectedSection","undefined");
		return;
	}
	var splited_section = instance.getSplitedSectionByName(splited_section_name);
	if ((splited_section != null) || (splited_section == "null"))
		splited_section.load(content.document.location);	
	else
		instance.renderMainSplitedPage(content.document);
};


/***************************************
	AccesibleApplication
 */

function SplitPage(name){
	this.name = name;
	this.languages = {"es":{},"en":{}};
	this.languages["es"]["main_title"] = "Opciones de Navegaci&oacute;n";
	this.languages["es"]["menu"] = "Men&uacute;";
	this.languages["es"]["go_main_menu"] = "Ir al men&uacute; principal";
	this.languages["es"]["go"] = "Ir a ";
	
	this.languages["en"]["main_title"] = "Navigation options";
	this.languages["en"]["menu"] = "Menu";
	this.languages["en"]["go_main_menu"] = "Go to main menu";
	this.languages["en"]["go"] = "Go to";

	this.current_language = this.languages["es"];
	this.staticLinkFirst = true;
	this.staticLinks = [];
	this.splitedSections = [];
	this.mainSplitedSection = null;
	this.refactoring_information = null;
	instance = this;
	window.addEventListener("SplitedSectionSelected",function(e) {  SplitPage_loadSplitedSection(e); }, false, true);
};

SplitPage.prototype = new AbstractGenericRefactoring();

SplitPage.prototype.setLanguage = function(language){
	try{
		this.language_current = this.languages[language];
		for (var i=0;i < this.splitedSections.length;i++){
			this.splitedSections[i].setLanguage(language);
		}
	}
	catch(e){;}
};

SplitPage.prototype.adaptDocument = function(doc){
	this.refactoring_information = RefactoringPersistenceManager.getInstance().getRefactoringInformation(this);
	if ((typeof(this.refactoring_information["selectedSection"]) == "undefined") || (this.refactoring_information["selectedSection"] == "undefined")){
		if(this.mainSplitedSection != null){
			this.mainSplitedSection.showSection(doc);
			return;
		};
		this.renderMainSplitedPage(doc);	
	}
	else{
		if(this.refactoring_information["selectedSection"] == "main_splited_home"){
			RefactoringPersistenceManager.getInstance().setRefactoringInformation(instance,"selectedSection","undefined");
			this.renderMainSplitedPage(doc);
		}
		else{
			var splited_section = this.getSplitedSectionByName(this.refactoring_information["selectedSection"]);
			splited_section.showSection(doc);
		}
	}
	RefactoringPersistenceManager.getInstance().setRefactoringInformation(instance,"selectedSection","undefined");
};

SplitPage.prototype.renderMainSplitedPage = function(doc){
	doc.body.innerHTML = "";
	var title = doc.createElement("h2");
	title.innerHTML = this.name + " - " + "Menu navegacional";//this.language_current["main_title"];
	var ul = doc.createElement("ul");
	if (this.staticLinkFirst){
		for(var i=0;i < this.staticLinks.length;i++){
			var li = doc.createElement("li");
			var innerHTML = this.staticLinks[i].renderAnchor();
			li.innerHTML = innerHTML;			
			ul.appendChild(li);
		}
	}
	for(var i=0;i < this.splitedSections.length;i++){
		var li = doc.createElement("li");
		var innerHTML = this.splitedSections[i].renderAnchor();
		li.innerHTML = innerHTML;
		ul.appendChild(li);
	}
	if (!this.staticLinkFirst){
		for(var i=0;i < this.staticLinks.length;i++){
			var li = doc.createElement("li");
			var innerHTML = this.staticLinks[i].renderAnchor();
			li.innerHTML = innerHTML;
			ul.appendChild(li);
		}
	}	
	doc.body.appendChild(title);
	doc.body.appendChild(ul);	
};

SplitPage.prototype.buildMainPage = function(){
	//content.document = mainPageBuilderForSplitedPage(this.splitedSections);
	this.renderMainSplitedPage();
};

SplitPage.prototype.load = function (url){
	//content.document.location.href = "about:blank";
	content.document.location.href = url;
};

SplitPage.prototype.reload = function (url){
	target_section = null;//Esta linea solo es temporal.
	if(url)
		this.load(url);
	else
		this.load(this.url);
};

SplitPage.prototype.setAsMain = function(aSection){
	this.mainSplitedSection = aSection; 
};

SplitPage.prototype.setAsFirstSplitedSection = function(){
	this.staticLinkFirst = false;
};

SplitPage.prototype.getSplitedSectionByName = function(splited_section_name){
	for(var i=0;i < this.splitedSections.length;i++){
		if (this.splitedSections[i].name == splited_section_name)
			return this.splitedSections[i];
	}
	return null;
};

SplitPage.prototype.isMainSection = function(aSection){
	return this.mainSplitedSection == aSection;
};

SplitPage.prototype.getCurrentBasicURL = function(){
	var doc = content.document; 
	var href;
	try{		
		href = doc.location.href.match(this.url)[0];
	}catch(e){return "#"}
	return href;	
};

SplitPage.prototype.getAnchor = function(doc){
	var anchor = doc.createElement("a");
	var onclick = 'event = document.createEvent("Event");event.initEvent("SplitedSectionSelected", true, false);this.dispatchEvent(event);';
	anchor.setAttribute("id","main_splited_home");
	anchor.setAttribute("onclick",onclick);
	var href = "#";
	//try{		
	//	href = doc.location.href.match(this.url);
	//}catch(e){alert(e)}
	anchor.setAttribute("href",href);
	anchor.innerHTML = "Inicio";
	return anchor;	
};

SplitPage.prototype.renderAnchor = function(){
	onclick = 'event = document.createEvent("Event");event.initEvent("SplitedSectionSelected", true, false);this.dispatchEvent(event);';
	return " <a id='main_splited_home'href='javascript:void(0);' onclick='" + onclick + "'>Inicio</a> ";
};

SplitPage.prototype.addSplitedSection = function(aSplitedSection){
	this.splitedSections.push(aSplitedSection);
};

SplitPage.prototype.addStaticLink = function(aStaticLink){
	this.staticLinks.push(aStaticLink);
};

/***************************************
	SplitedSection
 */

function SplitedSection(name,app){
	//El nombre de la sección es imporante ya que sirve como 
	this.name = name;
	//La apliación que 
	this.accesible_app = app;
	//Una colección de XPaths de elementos que deben quedar en esta sección.
	this.elements = [];//debería ser un dictionario de Concepto:Xpath
	this.elements_for_removing = [];
	//Una colección de otras secciones accesibles desde esta
	this.relatedSplitedSections = [];
	this.staticLinks = [];
	
	this.languages = {"es":{},"en":{}};
	this.languages["es"]["main_title"] = "Opciones de Navegaci&oacute;n";
	this.languages["es"]["menu"] = "Men&uacute;";
	this.languages["es"]["go_main_menu"] = "Ir al men&uacute; principal";
	this.languages["es"]["go"] = "Ir a ";
	
	this.languages["en"]["main_title"] = "Navigation options";
	this.languages["en"]["menu"] = "Menu";
	this.languages["en"]["go_main_menu"] = "Go to main menu";
	this.languages["en"]["go"] = "Go to";

	this.current_language = this.languages["es"];
};

SplitedSection.prototype.setLanguage = function(language){
	try{
		this.current_language = this.languages[language];		
	}
	catch(e){;}
};

SplitedSection.prototype.addElement = function(xpath_element){
	this.elements.push(xpath_element);
};

SplitedSection.prototype.addElementForRemoving = function(xpath_element){
	this.elements_for_removing.push(xpath_element);
};

SplitedSection.prototype.addRelatedSplitedSection = function(aSplitedSection){
	if (this.relatedSplitedSections.indexOf(aSplitedSection) == -1)
		this.relatedSplitedSections.push(aSplitedSection);
};

SplitedSection.prototype.addStaticLink = function(aStaticLink){
	this.staticLinks.push(aStaticLink);
};


SplitedSection.prototype.load = function(url){
	RefactoringPersistenceManager.getInstance().setRefactoringInformation(this.accesible_app,"selectedSection",this.name);	
	this.accesible_app.load(url);
};

SplitedSection.prototype.getLinksToRelatedSplitedSections = function(){	
	return this.relatedSplitedSections.map(function(section){return section.renderAnchor();});	
};

SplitedSection.prototype.getAnchorsToRelatedSplitedSections = function(doc){
	var anchors = [];
	for(var i=0;i < this.relatedSplitedSections.length;i++)
		anchors.push(this.relatedSplitedSections[i].getAnchor(doc));
	return 	anchors;
};

SplitedSection.prototype.getAnchor = function(doc){
	var anchor = doc.createElement("a");
	var onclick = 'event = document.createEvent("Event");event.initEvent("SplitedSectionSelected", true, false);this.dispatchEvent(event);';
	anchor.setAttribute("id",this.name);
	anchor.setAttribute("onclick",onclick);
	anchor.setAttribute("href","javascript:void(0);");
	anchor.innerHTML = this.current_language["go"] + " " + this.name;
	return anchor;
};

SplitedSection.prototype.cleanChild = function(node,persistentElements){
	if(this.nodeRemovable(node,persistentElements))
		node.parentNode.removeChild(node);
};

SplitedSection.prototype.hasSomePersistentElement = function(node,persistentElements){
	for(var j=0;j < persistentElements.length;j++){
		var persistentElement = persistentElements[j];
		if (node == persistentElement){
			return true;
		}
		var node_children = node.getElementsByTagName('*');
		for(var i=0;i < node_children.length;i++){
			var child = node_children[i];			
			if(child == persistentElement){
				return true;
			}
		}
	}
	return false;
};

SplitedSection.prototype.isSelectedAsPersisted = function(node,persistent_elements){
	for(var j=0;j < persistent_elements.length;j++){
		var persistentElement = persistent_elements[j];
		if (node == persistentElement){
			return true;
		}
	}
}

SplitedSection.prototype.makeDeeperRemoving = function(node,persistent_elements){
	var children = node.children;
	var for_removing = [];
	for(var i = 0;i < children.length;i++){
		var child = children[i];
		try{
			if(this.hasSomePersistentElement(child,persistent_elements)){
				if(!this.isSelectedAsPersisted(child,persistent_elements))
					this.makeDeeperRemoving(child,persistent_elements);
				else
					continue;
			}
			else
				try{
					for_removing.push(child);
				}catch(e){;}
		}
		catch(e){
			continue;
		}
	}
	for(var i=0;i < for_removing.length;i++)
		for_removing[i].parentNode.removeChild(for_removing[i]);
};

SplitedSection.prototype.showSection = function(doc){
	var bodyDOM = doc.body;
	var persistentElements = [];
	for (var i = 0;i < this.elements.length;i++){
		var dom_elements = doc.evaluate(this.elements[i], doc, null, XPathResult.ANY_TYPE, null);
		var element = dom_elements.iterateNext();
		while (element) {			
			var persistNode = element.cloneNode(true);
			//persistentElements.push(persistNode);
			persistentElements.push(element);
			element = dom_elements.iterateNext();
		}
	}	

	this.makeDeeperRemoving(bodyDOM,persistentElements);

	var elements_for_removing = [];
	for (var i = 0;i < this.elements_for_removing.length;i++){
		var dom_elements = doc.evaluate(this.elements_for_removing[i], doc, null, XPathResult.ANY_TYPE, null);
		var element = dom_elements.iterateNext();
		while (element) {
			elements_for_removing.push(element);
			element = dom_elements.iterateNext();
		}
	}
	for (var j = 0;j < elements_for_removing.length;j++)
		try{
			elements_for_removing[j].parentNode.removeChild(elements_for_removing[j]);
		}catch(e){;}	
	
	var referenceNode = bodyDOM.firstChild;
	var title = doc.createElement("h2");
	title.innerHTML = this.current_language["menu"];
	bodyDOM.insertBefore(title,referenceNode);
	referenceNode = title.nextSibling;
	var navigation_list = doc.createElement("ul");
	var main_menu_anchor = this.accesible_app.getAnchor(doc);
	main_menu_anchor.innerHTML = this.current_language["go_main_menu"];
	var navigation_item = doc.createElement("li");
	navigation_item.appendChild(main_menu_anchor);
	navigation_list.appendChild(navigation_item);	
	var links = this.getAnchorsToRelatedSplitedSections(doc);
	for (var i = 0;i < links.length;i++){
		var navigation_item = doc.createElement("li");
		navigation_item.appendChild(links[i]);
		navigation_list.appendChild(navigation_item);
	}
	for(var i=0;i < this.staticLinks.length;i++){
		var li = doc.createElement("li");
		li.innerHTML = this.staticLinks[i].renderAnchor();
		navigation_list.appendChild(li);
	}	
	bodyDOM.insertBefore(navigation_list,referenceNode);
	referenceNode = navigation_list.nextSibling;
	var second_title = doc.createElement("h3");
	second_title.innerHTML = this.name;
	bodyDOM.insertBefore(second_title,referenceNode);
	
	return;
};

SplitedSection.prototype.renderAnchor = function(){
	var onclick = 'event = document.createEvent("Event");event.initEvent("SplitedSectionSelected", true, false);this.dispatchEvent(event);';
	var href = "javascript:void(0)";
	//if(this.accesible_app.isMainSection(this))
	href = this.accesible_app.getCurrentBasicURL();	
	try{
		return " <a id='" + this.name + "' href='" + href + "' onclick='" + onclick + "'>" + this.name + " - " + this.current_lenguage["main_title"] + "</a> ";
	}catch(e){		
		return " <a id='" + this.name + "' href='" + href + "' onclick='" + onclick + "'>" + this.name + "</a> ";
	};
};

/*
 * StaticLinks 
 */

function StaticLink(name,target_url){
	//El nombre de la sección es imporante ya que sirve como 
	this.name = name;
	//La apliación que 
	this.target_url = target_url;
};

StaticLink.prototype.renderAnchor = function(){
	var onclick = 'event = document.createEvent("Event");event.initEvent("SplitedSectionSelected", true, false);this.dispatchEvent(event);';	
	return " <a id='" + "undefined" + "'  href='"+ this.target_url +"' onclick='"+ onclick +"'>" + this.name + "</a> ";
};
var exportedObjects = {"GenericRefactoring":SplitPage,"SplitedSection":SplitedSection, "StaticLink":StaticLink};
