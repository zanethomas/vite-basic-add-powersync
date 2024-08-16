// This is the main entry point of the application

import { openDatabase, loadItems, insertItem } from './connectors/powersync';
let inputField;
let itemList;

document.addEventListener('DOMContentLoaded', async event => {
	inputField = document.getElementById("inputField");
	itemList = document.getElementById("itemList");
 
	inputField.addEventListener("keydown", keyDown);
	await openDatabase();
	await insertItem('test');
	console.log('inserted');
	let items = await loadItems();
	console.log('items',items);
});

const keyDown = async (event) => {
	if (event.key === "Enter") {
		const item = document.createElement("li");
		item.innerText = inputField.value;
		itemList.appendChild(item);
		inputField.value = "";
	}
}