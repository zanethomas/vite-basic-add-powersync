// This is the main entry point of the application

import {
  openDatabase,
  insertItem,
  updateItem,
  deleteAllItems,
} from "@/database";
import { loadItems } from "./database";

let inputField;
let itemList;
let clearButton;
let editing;

document.addEventListener("DOMContentLoaded", async (event) => {
  inputField = document.getElementById("inputField");
  itemList = document.getElementById("itemList");
  clearButton = document.getElementById("clearButton");

  inputField.addEventListener("keydown", keyDown);
  itemList.addEventListener("click", itemClick);
  clearButton.addEventListener("click", clearList);

  await openDatabase();
  await loadItems().then((rows) => {
    console.log(rows);
    populateList(rows);
    inputField.placeholder = "Type something and press Enter";
    inputField.disabled = false;
  });
});

const itemClick = async (event) => {
  const item = event.target.innerText;
  const id = event.target.id;
  if (id) {
    editing = event.target;
    inputField.value = item;
    inputField.focus();
  }
};

const keyDown = async (event) => {
  if (event.key === "Enter") {
    if (!editing) {
      const rval = await insertItem(inputField.value);

      appendItem(rval.rows._array[0]);
    } else {
      updateItem(editing.id, inputField.value);
      editing.innerText = inputField.value;
      editing = null;
    }
    inputField.value = "";
  }
};

const populateList = (rows) => {
  for (const row of rows) {
    appendItem(row);
  }
};

async function clearList() {
  await deleteAllItems();
  itemList.innerHTML = "";
}

const appendItem = (row) => {
  const li = document.createElement("li");

  li.id = row.id;
  li.innerText = row.item;
  itemList.appendChild(li);
};
