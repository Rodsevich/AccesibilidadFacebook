var metadata = {"author":"Andres Valencia", 
                "name":"SplitPage for message of Facebook", 
                "description":"Split Facebook para la pagina de mensages",
                "id":"splitPage-message-facebook-andres"};

function getAccessibilityAugmenter(){
    return new SplitPageMessageFacebook();
};

function SplitPageMessageFacebook(){
	this.languages = {"es":{},"en":{}};
	this.languages["es"]["message"] = "Mensages";
	this.languages["es"]["toolbar"] = "Herramientas";
	this.languages["es"]["recomendaciones"] = "Recomendaciones";

	this.languages["es"]["buscar"] = "Buscar";
	this.languages["es"]["home"] = "Home";
};

SplitPageMessageFacebook.prototype = new AbstractInstanceRefactoring();

SplitPageMessageFacebook.prototype.setTargetURLs = function(){
    this.addTargetURL(/https:\/\/www.facebook.com\/messages/); 
};

SplitPageMessageFacebook.prototype.initialize = function (language) {

    var refactoring = new SplitPage.SplitPage("Facebook page");

    var message = new SplitPage.SplitedSection(this.languages[language]["message"], refactoring);
    message.addElement(".//*[@id='contentArea']");


    var tools = new SplitPage.SplitedSection(this.languages[language]["toolbar"], refactoring);
    tools.addElement(".//*[@id='pagelet_bluebar']");


    var site = "https://www.facebook.com/";

    var buscar = new SplitPage.SplitedSection(this.languages[language]["buscar"], refactoring);
    buscar.addElement(".//*[@id='u_0_2']");
    message.addRelatedSplitedSection(buscar);

    //link al home
    var home = new SplitPage.PureLink(this.languages[language]["home"], site);
    message.addStaticLink(home);

    refactoring.addStaticLink(home);
    refactoring.addSplitedSection(message);
    refactoring.addSplitedSection(tools);
    refactoring.addSplitedSection(buscar);

    refactoring.setAsFirstSplitedSection();

    refactoring.setAsMain(message);
    this.abstract_refactoring = refactoring;

};

SplitPageMessageFacebook.prototype.initRefactoringForPageLoaded = function(doc,language){
	
};

//override
SplitPageMessageFacebook.prototype.adaptDocument = function (doc) {
    this.abstract_refactoring.adaptDocument(doc);
};
