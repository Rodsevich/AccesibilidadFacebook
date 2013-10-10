var metadata = {"author":"Sergio Firmenich", "name":"Reorder Table Columns", "description":"This generic refactoring reorder the columns of a target table in a given mode.","id":"reordertablecolumn-sfirmenich"};

function ReorderTableColumnsRefactoring(name){
	this.name = name;
	this.column_containers = null;//Un xPath para obtener todos los tr targets.
	this.movements = [];
};

ReorderTableColumnsRefactoring.prototype = new AbstractGenericRefactoring();

ReorderTableColumnsRefactoring.prototype.adaptDocument = function(doc){
	var tr_elements_iterator = doc.evaluate(this.column_containers, doc, null, XPathResult.ANY_TYPE, null);
	var tr = tr_elements_iterator.iterateNext();
	var trs = [];
	while (tr) {	
		trs.push(tr);
		tr = tr_elements_iterator.iterateNext();
	}
	for(var i=0;i < trs.length;i++)
		this.moveColumns(doc,trs[i]);
};

ReorderTableColumnsRefactoring.prototype.moveColumns = function(doc,tr){
	for (var i=0;i < this.movements.length;i++){
		var movement = this.movements[i];
		var target_column;
		try{
			var columns = tr.getElementsByTagName("td");
			target_column = columns[movement["column"]];			
		}catch(e){continue;}
		
		var new_column = target_column.cloneNode(true);
		
		if(movement["shift"] == "end"){
			tr.appendChild(new_column);
		}
		if(movement["shift"] == "begin"){
			var td_0 = tr.firstElementChild;
			tr.insertBefore(new_column,td_0);
		}
		tr.removeChild(target_column);
	}
};

ReorderTableColumnsRefactoring.prototype.setColumnContainers = function(aXPath){
	this.column_containers = aXPath;
};

ReorderTableColumnsRefactoring.prototype.addColumnMovement = function(number_of_column,shift){
	var movement = {"column":number_of_column,"shift":shift};
	this.movements.push(movement);
};

var exportedObjects = {"GenericRefactoring":ReorderTableColumnsRefactoring};
