var metadata = {"author":"Lisandro Ronconi", 
                "name":"SplitPage for Facebook", 
                "description":"Split Facebook home Page into two main sections: menu and wall. Also it adds some shortcuts to relevant functionalities",
                "id":"splitPage-facebook-licha"};

function getAccessibilityAugmenter(){
    return new FacebookListSplitWrapper();
};

function FacebookListSplitWrapper(){
	this.languages = {"es":{},"en":{}};
	this.languages["es"]["main"] = "Principal";
	this.languages["es"]["menu"] = "Menu izquierdo";

    this.languages["en"]["main"] = "Wall";
	this.languages["en"]["menu"] = "Left menu";
};

FacebookListSplitWrapper.prototype = new AbstractInstanceRefactoring();

FacebookListSplitWrapper.prototype.setTargetURLs = function(){
    this.addTargetURL(/https:\/\/www.facebook.com\//);
};

FacebookListSplitWrapper.prototype.initialize = function (language) {

    /*if(document.body.className =="hasLeftCol home composerExpanded fbx gecko win Locale_es_ES")
    {*/
    
    var refactoring = new SplitPage.SplitPage("Facebook page");

    var main = new SplitPage.SplitedSection(this.languages[language]["main"], refactoring);
    main.addElement(".//*[@id='contentCol']");


    var menu = new SplitPage.SplitedSection(this.languages[language]["menu"], refactoring);
    menu.addElement(".//*[@id='leftCol']");

    refactoring.addSplitedSection(main);
    refactoring.addSplitedSection(menu);
    refactoring.setAsFirstSplitedSection();

    refactoring.setAsMain(main);
    this.abstract_refactoring = refactoring;
    //}
};

FacebookListSplitWrapper.prototype.initRefactoringForPageLoaded = function(doc,language){
	
};
