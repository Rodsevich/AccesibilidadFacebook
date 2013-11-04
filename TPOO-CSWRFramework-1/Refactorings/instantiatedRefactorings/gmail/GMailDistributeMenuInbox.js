var metadata = {"author":"Sergio Firmenich", "name":"Distribute Menu for Gmail's Inbox", "description":"This refactoring distribute the mark as spam, archive and delete operations in all the listed emails","id":"distributeMenu-mainGmail-sfirmenich"};

function getAccessibilityAugmenter(){
	return new GMailDistributeMenu();
};

function GMailDistributeMenu(){

};

GMailDistributeMenu.prototype = new AbstractInstanceRefactoring();

GMailDistributeMenu.prototype.setTargetURLs = function(){
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/\?&?(st=)?[0-9]*$/);
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/\?&?(st=)?[0-9]*$/);
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/\?f=[\w\W]*&?(st=)?[0-9]*/);
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/\?gausr=[\w\W]*&?(st=)?[0-9]*/);
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/\?auth=[\w\W]*&?(st=)?[0-9]*/);
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/\?shva=[\w\W]*&?(st=)?[0-9]*/);
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/&?(st=)?[0-9]*$/);		
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/\?pli=[\w\W]*&?(st=)?[0-9]*/);
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/\?#&?(st=)?[0-9]*$/);
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/\?st=[\w\W]*&?(st=)?[0-9]*/);
	this.addTargetURL(/https:\/\/mail.google.com\/mail[\w|\W|0-9|\/]*\/h\/[\w]*\/\?zy=[\w\W]*&?(st=)?[0-9]*/);
};			

GMailDistributeMenu.prototype.initialize = function(language){		
		var refactoring = new DistributeMenu.DistributeMenu("GMAIL WebMail");

		refactoring.setItemXpath(".//table[@class='th']/tbody/tr");
		refactoring.setCheckBoxRelativePath("./td[4]/input");
											  
		var archive_operation = new DistributeMenu.DistributedOperation("Archivar",refactoring);
		archive_operation.setAction(".//input[@name='nvp_a_arch']");
		var archive_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADGUlEQVR4nO2Vz2tcVRTHP+feO28maYTMTJMamzQTkWzsrgv3LhTFJN3YhTZKHykVlW4KLl0Igi2FiIoLwSF/g0uhpYiI1DYgCmJVqBKtmZnWdpopzcy757p4kx/N/EgDXfY87uVx77vnc86533cvPLZdTLoNXr12HeAJwOzB1/0j06X1XQFXr10/crdeX1r568+SqnYNoJsNDA7qocnSVxDefu7Z6frGuNv54d36naX33ztzuFpZ7R8JELbPi/D8Cy+9PjM70wBO9QTU6/WJamUVYwwHx8ex1iIiSAciEAJoCDTW1qjVqvy4fIWZubkXy+VyFMdxsytgww6OT3B28ROyUYS1BiPCvcYaqoEomyWKIrwGvPfUbt7krRPzhBAgBANkgP4Aaw3ZKCIbZbDWUqtWOHP6XXySMFma4sNz53GA94ahoX3d1dILIO2aWmtw1uKcZaRY5NVjx2iuNylNTZHLRiTeI4A1aRkfCiDtXpDUuTU4a8gN7eP4/BuIgGrAa7rFIQSsTdUsQocaOgEiIHCvsUatWqFYyJNxjoyzOGMwYvCqtNTTanlaScIvP//UEWLfDASoVqssvHk8zUUEI9KOUAghtBub77KZ9y4ZQKrvgVyOV2ZnyWVzWGuwxmJNCtOgbQUpXpWVlRUuXbzQzVUnILR/nwNPjjF/YoGBbETGWYwIf/z+G5okDOcLjI6N0UrSEt367zaXLl4gtJ/+gLDRgWoaoXjh3xv/cOrkSYIq44cm+OLLJRDBq27VPcAO/90ySJuGgFcl8R6A/SOjLH76GT7xDBcKBBG89yTe49Wn+/EwJdrKJJB4xSSKBrDG8PQz0yBpgq3Ek6ji/UYQ3dz3AdSqFb779hsKxf04Y9LzaJtEtK2exCvLV37o4b4LwDm37pyj0WiweO4joF1h2ZLgprPw4JYO5/NAaAK+J2Bk9MDHC++c/mD58vdOdWt551n6oA0MDvLyzFzz1uqNr+M4vt8T0Lhz++xTxfyvk0ePviYiuZ3zvSxptZr11b8vJ63m59vHe95Y5XJZ2NuVGQCN43gPSx6B/Q97xFaNCADHwQAAAABJRU5ErkJggg%3D%3D";
		
		var spam_operation = new DistributeMenu.DistributedOperation("Spam",refactoring);
		spam_operation.setAction(".//input[@name='nvp_a_sp']");		
		var spam_img = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.350%EE%B3%9F%00%00%02%40IDAT8O%95%92MH%D3a%1C%C7G%87%0EED%B7%AE%5D%EB%10%81%A7%3A%88%DB%FF%BF%B7%BFN%96%CE9%5BnHSzQ%D1f%84%D3%B5J%3B%A4v%C8%EC%85%3A%04AB%5E%12%14d%98%92H%9E%0Cl%EF%FB%EF%B5%E6Ls%CEMq%ED%ED%F9%F6X%97%1D%B6%B1%1E%F8%C2%8F%2F%BF%CF%E79%3C%8F%40Ppl55%E7%9D%ACPY%D8U%3C%DB%AB%ABO%DB%25%C2%88%9D%15%5E%A9%18*%5Ct%C8%85%D3NN%04%87%5C%D4%FA%DF%02G%3D%23%F7)Y%12n%90%C0%A9%10%19%0F%05.%85%B0%D1%AFbNV%24s50%2BI%BD%02%3F%B5%1C%E8%FC%F6%10r%5E%16%19%5C%8D%8C%D5%AE%3A%7B%B4%AC%C4%D1%2C%BA%E0k%91%90%BCQ%8Bd%97%1A%EE%26%26rO%208%E2Q1u%DEf1%5CM%CCTY%81G%C3%0Cm%DET%82%3CjG~%F4%06%7Cz%19%5C%1AF%C6k%99%AAu%DA%87%0Cup%B7%B0c%25%25%DE%AB%ECR%D2%A2%03%5E%DF%06%994ag%A4%03%9EV%F1%82%5B%CB%9C%89%DEQ%235%D1%05%8FNL%7C%3A%F6RQ%89%B7M%BC%95z%D5%09%CC%DE%07V%C6%90%5B%7B%06%FF%AD%3A%E2%D5%89%EA7G%AF%81X%87%F1kX%07%BE%8D%FDPT%C0%B7%8B3%E9%8F%FD%80m%1C%88%BD%07%C9%CCakr%00%BCA%3C%9B%98%7F%08%F0%2F%91%99%B3%80%EE%AD%17%17%5C%97%C4%D3%8B%16%20%F1%0E%C8%2F%01%24%88%7D%9B%15%FE%EE%DA%5Cv%EF3%F0%7B%0A%C4%F3%14%81%1E%EE%A0%A8%C0%D7)YN%CE%0FPx%86%C2%01%00qdb%3C%B6%A7'%40%C8%06%ED%17%40bo%10%EC%E5%A2E%05%FEni%CF%C6s%3D%85%AD%14%8E%D2%EC%22%9F%DDF.Ea%C4h%FF%05%E9%F08%02%BD%D2OE%05%113w%2C%D0'%F3%EF%AF%BD%A0%40%84f%8F%DE%FC%2F%7F%05X%C6%CEL%1F%02Fi%7F%C9%A7%0C%DE%95%9E%0B%0D%D6~%8F%CF%3FA.%C1S(I%B3%83%FC%C1*v%17%87%106q_%5D%7D%17O%94%FDPAs%F5%A9%A0I%FE%20%3C%C89~%3CVg%23%23%9AL%C8%CC%7D%0B%0F%C8%FAW%3B%AA%8E%97%82%FF%00%A6%EBsk%1D%8C%14%02%00%00%00%00IEND%AEB%60%82";
		
		var delete_operation = new DistributeMenu.DistributedOperation("Eliminar",refactoring);
		delete_operation.setAction(".//input[@name='nvp_a_tr']");
		var delete_img = "data:image/gif,GIF89a%14%00%14%00%C4%17%00RXR%B9%C9%E9%C3%D4%E8%E6%EE%F8342%CC%D2%D6%98%B6%DF%87%88%87%DB%E7%F3%C3%C7%C0%A3%A4%A1%D9%DC%DA%9D%A6%BCq%8C%95%F4%F3%F5%D7%DE%EBCGH%99%A6%DB%8A%9C%AB%B1%BA%E2Vgu%B7%C0%CCfy%86%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%17%00%2C%00%00%00%00%14%00%14%00%00%05v%E0%25%8Edi%9Eh%AA%AE%A2%D4X%14%ABPV%E3%C2%14%00%1D(%E0%0C%88%87%200%99D%22%84%C5%09%40%B3%BD(9%08%A1rJP~B%A2!%02%91PO%D7%C6%83%C1%98X%B8_%B0%C32%96%98%D1%A9%2B%9B%E1%3EC%D2%26y%FB%7D%8F%AF%F7vx%25zt%7C%82%24ace%81~%03Y%13%5B%7D(%1257P%00%16%87%24%05%15%9D%9E%9D%05%2C%A2%A3%25!%00%3B";

		this.abstract_refactoring = refactoring;
};
