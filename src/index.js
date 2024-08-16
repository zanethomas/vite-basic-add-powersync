// This is the main entry point of the application

import { openDatabase } from './connectors/powersync';
let inputField;
let itemList;

document.addEventListener('DOMContentLoaded', async event => {
	inputField = document.getElementById("inputField");
	itemList = document.getElementById("itemList");
 
	inputField.addEventListener("keydown", keyDown);
	await openDatabase();
});

const keyDown = async (event) => {
	if (event.key === "Enter") {
		const item = document.createElement("li");
		item.innerText = inputField.value;
		itemList.appendChild(item);
		inputField.value = "";
	}
}