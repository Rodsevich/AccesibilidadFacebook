var metadata = {"author":"Sergio Firmenich", "name":"Distribute Menu", "description":"This generic refactoring distribute operations designed to be applied over a set of elements in each of these elements","id":"distribute-menu-sfirmenich"};

var instance_DistributeMenu = null;

function DistributeMenu_operationSelected(e){
	var doc = content.document;
	var operation_name = e.target.id.split("-")[0];
	var row_id = e.target.id.split("-")[1];
	var operation = instance_DistributeMenu.getOperationByName(operation_name);
	var checkbox = instance_DistributeMenu.getCheckBoxForRow(doc,row_id);	
	if ((operation != null) && (checkbox != null)){
		operation.performOperation(doc, checkbox);
	}
};

function DistributeMenu_operationSelectedFromMenu(e){
	var doc = content.document;
	var operation_name = e.target.id.split("-")[2];
	var row_id = e.target.id.split("-")[1];
	var operation = instance_DistributeMenu.getOperationByName(operation_name);
	var checkbox = instance_DistributeMenu.getCheckBoxForRow(doc,e.target.getAttribute("target_row"));
	if ((operation != null) && (checkbox != null)){
		operation.performOperation(doc, checkbox);
	}
};

var __distribute_menu_strategy__ = null;

function DistributeMenu_ToggleStrategyMenu(){
	try{
		document.getElementById("with-contextual-menu").disabled = !document.getElementById("with-contextual-menu").disabled;
		document.getElementById("with-contextual-menu").setAttribute("checked",!document.getElementById("with-contextual-menu").getAttribute("checked"));	
		document.getElementById("with-container-column").disabled = !document.getElementById("with-container-column").disabled;
		document.getElementById("with-container-column").setAttribute("checked",!document.getElementById("with-container-column").getAttribute("checked"));
		var tmp = content.document.location;
		content.document.location = "about:blank";
		content.document.location = tmp;		
	}catch(e){;}
};

function DistributeMenu_SetContextualMenuStrategy(){	
	__distribute_menu_strategy__ = "this.adaptWithContextualMenu";
	//DistributeMenu_ToggleStrategyMenu();
};

function DistributeMenu_SetColumnContainerStrategy(){
	__distribute_menu_strategy__ = "this.adaptWithNewContainer";
	//DistributeMenu_ToggleStrategyMenu();
};


/***************************************
	AccesibleApplication
 */
if(__distribute_menu_strategy__ == null)
	DistributeMenu_SetColumnContainerStrategy();

function DistributeMenu(name){
	this.name = name;
	this.elements_xpath = null;
	this.operations = [];
	this.checkbox_relative_path = null;
	this.hide_checkbox = false;
	this.header = [];
	this.header_subelement = "";
	this.strategy = this.adaptWithNewContainer;
	if (__distribute_menu_strategy__ != null)
		this.strategy = __distribute_menu_strategy__;
	if (__distribute_menu_strategy__ == "this.adaptWithNewContainer"){
		window.removeEventListener("popupshowing", this.showingPopMenu, false);
		window.removeEventListener("popuphidden", this.hiddingPopMenu, false);	
	}else{
		window.addEventListener("popupshowing", this.showingPopMenu, false);
		window.addEventListener("popuphidden", this.hiddingPopMenu, false);			
	}	
	instance_DistributeMenu = this;
	this.reinitializeContextualMenu();
	window.addEventListener("DistributedOperationSelected",function(e) {DistributeMenu_operationSelected(e); }, false, true);	
};

DistributeMenu.prototype = new AbstractGenericRefactoring();

DistributeMenu.prototype.reinitializeContextualMenu = function(){	
	var context_menu = document.getElementById("contentAreaContextMenu");
	var childNodes = context_menu.childNodes;	
	for (var i = 0; i < childNodes.length; i++) {		
  		var child = childNodes[i];
  		if(child.getAttribute("class") == "context-for-refactoring")
  			context_menu.removeChild(child);  			
	}
};

DistributeMenu.prototype.createContainerForContextualMenu = function(doc,item_index,row){
	if (this.header.length && (item_index == 0)){
		var thElement = doc.createElement("th");
		row.appendChild(thElement);
		return thElement;
	}
	var tdElement = doc.createElement("td");
    tdElement.setAttribute("nowrap", "");
    tdElement.setAttribute("width", "70px");
    var container = doc.createElement("div");
    tdElement.appendChild(container);
    row.appendChild(tdElement);
	return container;
};

DistributeMenu.prototype.createMenuItemForContextualMenu = function(doc,item_index,row){
	var contextual_menu = document.getElementById("contentAreaContextMenu");    
	return contextual_menu;
};

DistributeMenu.prototype.createContainerInNewColumn = function(doc,item_index,row){
	if (this.header.length && (item_index == 0)){
		var thElement = doc.createElement("th");
		row.appendChild(thElement);
		return thElement;
	}
	var tdElement = doc.createElement("td");
    tdElement.setAttribute("nowrap", "");
    tdElement.setAttribute("width", "70px");
    var container = doc.createElement("div");
    tdElement.appendChild(container);
    row.appendChild(tdElement);
	return container;
};

DistributeMenu.prototype.adaptDocument = function(doc){	
	var func = eval("(" + __distribute_menu_strategy__ + ")");
	this.strategy = func;
	this.strategy(doc);
};

DistributeMenu.prototype.hiddingPopMenu = function(event){	
	var context_menu = document.getElementById("contentAreaContextMenu");
	if (event.target != context_menu)
		return;
		var childNodes = context_menu.childNodes;
	
	for (var i = 0; i < childNodes.length; i++) {		
  		var child = childNodes[i];
  		if(child.getAttribute("class") == "context-for-refactoring"){
  			//context_menu.removeChild(child);
  			child.hidden = true;
  		}
  		else
  			child.hidden = false;
	}	
};

DistributeMenu.prototype.showingPopMenu = function(event){
	if(document.popupNode == null) return;	
	if(document.popupNode.getAttribute("refactoringoption") == "true"){		
		var target_row = document.popupNode.getAttribute("dm-target-row");
		var context_menu = document.getElementById("contentAreaContextMenu");
		var childNodes = context_menu.childNodes;		
		for (var i = 0; i < childNodes.length; i++) {
	  		var child = childNodes[i];	  		
	  		if (child.getAttribute("class") != "context-for-refactoring")
		    	child.hidden = true;
			else{
				child.hidden = false;
				child.setAttribute("target_row",target_row);
			}	    	
		}
	}
	else{		
		/*
		document.getElementById("context-item-add-instance-to-suitcase").hidden = false;
		document.getElementById("context-item-add-data-to-suitcase").hidden = false;		
		document.getElementById("delete-data-from-pocket").hidden = true;
		for (var i = 0;i < actions.length;i++)
			document.getElementById("augmentation-action-"+i).hidden = true;
		*/
	}
};

DistributeMenu.prototype.recursive_refactoringoperable_setter = function(target,index){
	try{
		target.setAttribute("refactoringoption","true");
		target.setAttribute("dm-target-row",index);		
    	var children = target.children;
    	for (var j=0;j < children.length;j++)
    	 	this.recursive_refactoringoperable_setter(children[j],index);    	
    }
    catch(e){;}   	
};

DistributeMenu.prototype.adaptWithContextualMenu = function(doc){


	var elements = doc.evaluate(this.elements_xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var container = this.createMenuItemForContextualMenu(doc,i,actualRow);
    try{
	    for (var i = 0; i < elements.snapshotLength; i++) {
	        var actualRow = elements.snapshotItem(i);
        	this.recursive_refactoringoperable_setter(actualRow,i);
	    }
	  }catch(e){;}
    this.addOperationsToContextualMenu(container,doc);
};


DistributeMenu.prototype.adaptWithNewContainer = function(doc){
	var elements = doc.evaluate(this.elements_xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < elements.snapshotLength; i++) {
        var actualRow = elements.snapshotItem(i);
        //this.addOperationsToRow(actualRow,i,doc);
        var container = this.createContainerInNewColumn(doc,i,actualRow);
		if (this.header.length && (i == 0)){
			continue;
		}
       	this.addOperationsToContainer(container,actualRow,i,doc);        
    }
    var header_element = elements.snapshotItem(0)
    if (this.header.length){
    	var target_elements = doc.evaluate(this.header_subelement, header_element, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    	for (var i = 0; i < target_elements.snapshotLength; i++) {
        	var actual = target_elements.snapshotItem(i);
        	try{
        		actual.innerHTML = this.header[i];
        	}
        	catch(e){
				continue;        		
        	}
    	} 	
    }
};

DistributeMenu.prototype.replaceFirstByHeader = function(subelement_xpath,columns_headers){
	this.header = columns_headers;
	this.header_subelement = subelement_xpath;
};

DistributeMenu.prototype.setItemXpath = function(aXpath){
	this.elements_xpath = aXpath;
};

DistributeMenu.prototype.setCheckBoxRelativePath = function(aXpath){
	this.checkbox_relative_path = aXpath;
};

DistributeMenu.prototype.addOperation = function(anOperation){
	this.operations.push(anOperation);
};

DistributeMenu.prototype.addOperationsToRow = function(aRow,item_index,doc){
	for(var i=0;i < this.operations.length;i++){
		if(aRow.children.length <= 1)
			continue;
		this.operations[i].addOperationToRow(aRow,item_index,doc);
		if(this.hide_checkbox)
			;//hideCheckBox
	}
};

DistributeMenu.prototype.addOperationsToContextualMenu = function(container,doc){
	for(var i=0;i < this.operations.length;i++){
		this.operations[i].addOperationToContextualMenu(container,doc);
	}
};

DistributeMenu.prototype.addOperationsToContainer = function(container,aRow,item_index,doc){
	for(var i=0;i < this.operations.length;i++){
		if(aRow.children.length <= 2)
			continue;
		this.operations[i].addOperationToContainer(container,item_index,doc);
	}
};

DistributeMenu.prototype.getOperationByName = function(operation_name){
	for(var i=0;i < this.operations.length;i++){
		if (this.operations[i].getName() == operation_name)
			return this.operations[i];
	}
	return null;
};

DistributeMenu.prototype.getCheckBoxForRow = function(doc,row_index){
	var row = doc.evaluate(this.elements_xpath,doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(row_index);
	if (row == null) return null;
	var checkbox = doc.evaluate(this.checkbox_relative_path,row, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    if (checkbox == null) return null;
	return checkbox;
};

DistributeMenu.prototype.unCheckCheckBoxes = function(doc){
	var elements = doc.evaluate(this.elements_xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < elements.snapshotLength; i++) {
        var actualRow = elements.snapshotItem(i);
		var checkbox = doc.evaluate(this.checkbox_relative_path, actualRow, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    	if (checkbox == null) continue;
    	checkbox.setAttribute("checked", "false");
    	checkbox.checked = false;
    }
};
/***************************************
	Operations
	Cada operacion del menu que quiere pasarse al lado de cada item
 */

function DistributedOperation(name,distributeMenu){ 
	this.menu = distributeMenu;
	this.action_xpath = null;
	this.hide_operation = true;
	this.event = "click";
	this.img = null;
	this.name = name;
	this.menu.addOperation(this);
};

DistributedOperation.prototype.setImg = function(aImg){
	this.img = aImg;
};

DistributedOperation.prototype.setAction = function(xpath_element){
	this.action_xpath = xpath_element;
};

DistributedOperation.prototype.getAction = function(xpath_element){
	return this.action_xpath;
};

DistributedOperation.prototype.getName = function(){
	return this.name;
};

DistributedOperation.prototype.hideOperation = function(doc){
	var action = doc.evaluate(this.action_xpath,doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	action.style.visibility = 'collapse';
};

DistributedOperation.prototype.getActionForDocument = function(doc){
	var element = doc.evaluate(this.getAction(), doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	return element;
};

DistributedOperation.prototype.performOperation = function(doc,check_box){
	var action = doc.evaluate(this.action_xpath,doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	check_box.setAttribute("checked", "true");
	var event = doc.createEvent("MouseEvents");
    event.initMouseEvent(this.event, true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var result = action.dispatchEvent(event);
};

DistributedOperation.prototype.getStringForTextAttributes = function(doc){
	var text = this.getName();
	if ((text == "") || (typeof(text) == "undefined")) {
		var action = this.getActionForDocument(doc);
		text = action.getAttribute("value");
	}
	return text;
};

DistributedOperation.prototype.renderAnchorForOperation = function(doc,item_index){
	var anchor = doc.createElement("a");
	var onclick = 'event = document.createEvent("Event");event.initEvent("DistributedOperationSelected", true, true);this.dispatchEvent(event);';
	anchor.setAttribute("id",this.name + "-" + item_index);
	anchor.setAttribute("onclick",onclick);
	anchor.setAttribute("style", "padding:2px;font-size:10px;");
	//anchor.setAttribute("href",doc.location.href);
	anchor.setAttribute("href","javascript:void(0);");
	anchor.setAttribute("nowrap", "");
    var imgElement = doc.createElement("img");
    imgElement.src = this.img;
    var label = this.getStringForTextAttributes(doc);
    imgElement.setAttribute("alt",label);
    imgElement.setAttribute("title",label);
    if (this.img != null)
    	anchor.appendChild(imgElement);
   	else
   		anchor.innerHTML = label;
	return anchor;
};

DistributedOperation.prototype.createNewColumn = function(doc,item_index){
	var tdElement = doc.createElement("td");
    tdElement.setAttribute("nowrap", "");
    tdElement.setAttribute("width", "auto");
	var anchor = this.renderAnchorForOperation(doc,item_index);	
	tdElement.appendChild(anchor);
	return tdElement;
};

DistributedOperation.prototype.addOperationToRow = function(aRow,item_index,doc){
	this.hideOperation(doc);
	var new_column = this.createNewColumn(doc,item_index);
	aRow.appendChild(new_column);
};

DistributedOperation.prototype.addOperationToContainer = function(container,item_index,doc){
	var anchor = this.renderAnchorForOperation(doc,item_index);		
	container.appendChild(anchor);	
};

DistributedOperation.prototype.addOperationToContextualMenu = function(container,doc){
	var label = this.getStringForTextAttributes(doc);	
	var menuitem = document.getElementById("operation-"+this.action_xpath+"-"+label);
	if (menuitem == null)
		menuitem = document.createElement("menuitem");	
	menuitem.setAttribute("class","context-for-refactoring");
	var id = "operation-"+this.action_xpath+"-"+label;
	menuitem.setAttribute("id", id);
	
	menuitem.setAttribute("label",label);
	menuitem.setAttribute("oncommand","DistributeMenu_operationSelectedFromMenu(event)");
	//menuitem.addEventListener("click",DistributeMenu_operationSelectedFromMenu,false);
	
	container.appendChild(menuitem);
};

var exportedObjects = {"GenericRefactoring":DistributeMenu,"DistributedOperation":DistributedOperation};