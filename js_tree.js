"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 3

   Author: Ethan Gruenemeier
   Date: 4.4.19

   Filename: js_tree.js

   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document


   Functions List:
   makeTree() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document

   makeBranches(treeNode, nestedList)
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throught the node tree of the source document.

   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't
*/
// Global vars that count the amount of nodes are in the document.
var nodeCount = 0;
var elemCount = 0;
var textCount = 0;
var wsCount = 0;

// this loads the makeTree function on the page loading.
window.onload = makeTree;
// This function establishes the node tree aside and appends the nodes to the document. 
function makeTree() {
	var aside = document.createElement("aside");
	aside.id = "treeBox";
	aside.innerHTML = "<h1>Node Tree</h1>";

	var sectionMain = document.getElementById("main");
	sectionMain.appendChild(aside);

	var nodeList = document.createElement("ol");
	aside.appendChild(nodeList);

	var sourceArticle = document.querySelector("#main article");
	// calls the makeBranches function with 2 arguments.
	makeBranches(sourceArticle, nodeList);
	// adds the values of the amount of certain types of nodes to the website.
	document.getElementById("totalNodes").textContent = nodeCount;
	document.getElementById("elemNodes").textContent = elemCount;
	document.getElementById("textNodes").textContent = textCount;
	document.getElementById("wsNodes").textContent = wsCount;

}
// This function creates a nested list and loops throught the pages nodes and displays them in a nested format on the page. Starts with the root nodes and then loops through to the child nodes to display them in a nested form as the html would appear.
function makeBranches(treeNode, nestedList) {
	nodeCount++;
	var liElem = document.createElement("li");
	liElem.innerHTML = ("+--");

	var spanElem = document.createElement("span");
	liElem.appendChild(spanElem);
	nestedList.appendChild(liElem);

	if (treeNode.nodeType === 1) {
		elemCount++;
		spanElem.setAttribute("class", "elementNode");
		spanElem.textContent = "<" + treeNode.nodeName + ">";
	} else if (treeNode.nodeType === 3) {
		textCount++;
		var textString = treeNode.nodeValue;

		if (isWhiteSpaceNode(textString)) {
			wsCount++;
			spanElem.setAttribute("class", "whiteSpaceNode");
			spanElem.textContent = "#text";
		} else {
			spanElem.setAttribute("class", "textNode");
			spanElem.textContent = textString;
		}
	}

	if (treeNode.childNodes.length > 0) {
		var newList = document.createElement("ol");
		newList.innerHTML = "|";
		nestedList.appendChild(newList);
		for (var n = treeNode.firstChild; n != null; n = n.nextSibling) {
			makeBranches(n, newList);
		}
	}
}



function isWhiteSpaceNode(tString) {
	return !(/[^\t\n\r ]/.test(tString));
}