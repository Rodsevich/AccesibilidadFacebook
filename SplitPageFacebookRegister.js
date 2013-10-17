var metadata = {"author":"Maximiliano Toledo", 
                "name":"SplitPage for Facebook Resgitering", 
                "description":"Split Facebook Registering Page into two main sections: Login and Registering. Also it adds some shortcuts to relevant functionalities",
                "id":"splitPage-facebook-maxi"};

function getAccessibilityAugmenter(){
    return new FacebookRegisterListSplitWrapper();
};

function FacebookRegisterListSplitWrapper(){
	this.languages = {"es":{},"en":{}};
	this.languages["es"]["login"] = "Identificarse";
	this.languages["es"]["registering"] = "Registrarse";

    this.languages["en"]["login"] = "Login";
	this.languages["en"]["registering"] = "Registering";
};

FacebookRegisterListSplitWrapper.prototype = new AbstractInstanceRefactoring();

FacebookRegisterListSplitWrapper.prototype.setTargetURLs = function(){
    this.addTargetURL(/https:\/\/www.facebook.com\//);
};

FacebookRegisterListSplitWrapper.prototype.initialize = function (language) {

    
    var refactoring = new SplitPage.SplitPage("Facebook Register page");

    var login = new SplitPage.SplitedSection(this.languages[language]["login"], refactoring);
    login.addElement("//*[@id='pagelet_bluebar']");


    var registering = new SplitPage.SplitedSection(this.languages[language]["registering"], refactoring);
    registering.addElement("//*[@id='registration_container']");

    refactoring.addSplitedSection(login);
    refactoring.addSplitedSection(registering);
    refactoring.setAsFirstSplitedSection();

    refactoring.setAsMain(login);
    this.abstract_refactoring = refactoring;
    //}
};

FacebookRegisterListSplitWrapper.prototype.initRefactoringForPageLoaded = function(doc,language){
	
};
