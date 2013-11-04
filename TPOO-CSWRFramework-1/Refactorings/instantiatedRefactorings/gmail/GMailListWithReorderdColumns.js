var metadata = {"author":"Sergio Firmenich", "name":"Reorder columns in Gmail list", "description":"This refactoring move the checkbox column to the end of the table","id":"reordercolumncheckbox-mainGmail-sfirmenich"};

function getAccessibilityAugmenter(){
	return new GMailListWithReorderedColumnsWrapper();
};

function GMailListWithReorderedColumnsWrapper(){
};

GMailListWithReorderedColumnsWrapper.prototype = new AbstractInstanceRefactoring();

GMailListWithReorderedColumnsWrapper.prototype.setTargetURLs = function(){
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/&?(st=)?[0-9]*/);	
	this.addExcludedURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/(\S)*v=b(&pv=tl){0,1}(&cs=b){0,1}/);	
};

GMailListWithReorderedColumnsWrapper.prototype.initialize = function(language){		
		var refactoring = new ReorderTableColumnsRefactoring.ReorderTableColumnsRefactoring("UGR WebMail");
		refactoring.setColumnContainers("html/body/table[2]/tbody/tr/td[2]/table[1]/tbody/tr/td[2]/form/table[2]/tbody/tr");
		refactoring.addColumnMovement(0,"end");
		this.abstract_refactoring = refactoring;
};

