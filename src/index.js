// This is the main entry point of the application

import { openDatabase, loadItems, insertItem, deleteAllItems } from './connectors/powersync';
let inputField;
let itemList;
let clearButton;

document.addEventListener('DOMContentLoaded', async event => {
	inputField = document.getElementById("inputField");
	itemList = document.getElementById("itemList");
	clearButton = document.getElementById("clearButton");
 
	inputField.addEventListener("keydown", keyDown);
	clearButton.addEventListener("click", clearList);
	await openDatabase();
	let items = await loadItems();
	console.log('items',items);
});

const keyDown = async (event) => {
	if (event.key === "Enter") {
		insertItem(inputField.value);
		inputField.value = "";
	}
}

async function clearList() {
	await deleteAllItems();
}
