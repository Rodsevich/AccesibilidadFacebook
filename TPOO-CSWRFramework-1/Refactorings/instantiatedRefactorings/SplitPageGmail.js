var metadata = {"author":"Sergio Firmenich", "name":"SplitPage for Gmail", "description":"Split Gmail Page into three main sections: mails, folders and options. Also it adds some shortcuts to relevant functionalities","id":"splitPage-mainGmail-sfirmenich"};

function getAccessibilityAugmenter(){
	return new GMailListSplitWrapper();
};

function GMailListSplitWrapper(){
	this.languages = {"es":{},"en":{}};
	this.languages["es"]["folders"] = "Carpetas";
	this.languages["es"]["more"] = "M&aacute;s aplicaciones";
	this.languages["es"]["search"] = "Buscar";
	this.languages["es"]["emails"] = "Correo";
	this.languages["es"]["logout"] = "Salir";
	this.languages["es"]["settings"] = "Configuraci&oacute;n";
	this.languages["es"]["compose"] = "Redactar";
	this.languages["es"]["help"] = "Ayuda";

	this.languages["en"]["folders"] = "Folders";
	this.languages["en"]["more"] = "More applications";
	this.languages["en"]["search"] = "Search";
	this.languages["en"]["emails"] = "E-Mails";
	this.languages["en"]["logout"] = "Logout";
	this.languages["en"]["settings"] = "Settings";
	this.languages["en"]["compose"] = "Compose";
	this.languages["en"]["help"] = "Help";
};

GMailListSplitWrapper.prototype = new AbstractInstanceRefactoring();

GMailListSplitWrapper.prototype.setTargetURLs = function(){
	this.addTargetURL(/https:\/\/mail.google.com\/mail\/h\/[\w]*\//);	
	this.addTargetURL(/https*:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/&?(st=)?[0-9]*/);
};

GMailListSplitWrapper.prototype.initialize = function(language){
		var refactoring = new SplitPage.SplitPage("GMAIL WebMail");

		var folders = new SplitPage.SplitedSection(this.languages[language]["folders"],refactoring);		
		folders.addElement("html/body/table[2]/tbody/tr/td[1]/table[1]");
		folders.addElement("html/body/table[2]/tbody/tr/td[1]/table[2]");
		folders.addElement("/html/body/link[2]");		
		folders.addElement("/html/body/style[1]");
		folders.addElementForRemoving("html/body/table/tbody/tr/td[1]/table[1]/tbody/tr[1]");
		
		var options = new SplitPage.SplitedSection(this.languages[language]["more"],refactoring);
		//options.addElement(".//*[@id='guser']/ul");
		options.addElement(".//*[@id='gbar']/ul");

		var search = new SplitPage.SplitedSection(this.languages[language]["search"],refactoring);
		search.addElement("/html/body/link[2]");		
		search.addElement("/html/body/style[1]");		
		search.addElement("/html/body/table[1]/tbody");
		//search.addElementForRemoving("html/body/table/tbody/tr[2]/tr/td/table/tbody/tr/td[1]/form/input[4]");
		search.addElementForRemoving("html/body/table/tbody/tr[2]/td/table/tbody/tr/td/input[3]");
									  
		var emails = new SplitPage.SplitedSection(this.languages[language]["emails"],refactoring);
		emails.addElement("/html/body/link[2]");		
		emails.addElement("/html/body/style[1]");	
		if (content.document.location.href.match(/https:\/\/mail.google.com\/mail\/h\/[\w]*\/\?s=q[\w\W]*$/) != null){
			emails.addElement("/html/body/table[1]/tbody");
			emails.addElementForRemoving("html/body/table/tbody/tr[2]/td/table/tbody/tr/td/input[3]");
		}
		emails.addElementForRemoving("//h2[@class='hdn']");
		emails.addElement("/html/body/table[2]/tbody/tr/td[2]/table");
		emails.addRelatedSplitedSection(folders);

		site = "/mail/u/0/h/";
		var logout = new SplitPage.StaticLink(this.languages[language]["logout"], site + "?logout");
		var settings = new SplitPage.StaticLink(this.languages[language]["settings"], site + "?v=prg");
		var compose = new SplitPage.StaticLink(this.languages[language]["compose"], site + "?v=b&pv=tl&cs=b");
		var help = new SplitPage.StaticLink(this.languages[language]["help"],"https://mail.google.com/support/?ctx=mail&hl=en");
		
		emails.addStaticLink(compose);
		emails.addStaticLink(logout);
		
		refactoring.addStaticLink(compose);
		refactoring.addStaticLink(logout);
		refactoring.addStaticLink(settings);
		refactoring.addStaticLink(help);
	
		refactoring.addSplitedSection(emails);
		refactoring.addSplitedSection(folders);
		refactoring.addSplitedSection(search);
		refactoring.addSplitedSection(options);
		refactoring.setAsMain(emails);
		refactoring.setAsFirstSplitedSection();

		this.abstract_refactoring = refactoring;
};

GMailListSplitWrapper.prototype.initRefactoringForPageLoaded = function(doc,language){
	
};
