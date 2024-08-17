// This is the main entry point of the application

import { PowerSync } from "@/connectors/powersync";
import { openDatabase, insertItem, updateItem, deleteAllItems } from "@/database";

let inputField;
let itemList;
let clearButton;
let editingId;

document.addEventListener("DOMContentLoaded", async (event) => {
  inputField = document.getElementById("inputField");
  itemList = document.getElementById("itemList");
  clearButton = document.getElementById("clearButton");

  inputField.addEventListener("keydown", keyDown);
  itemList.addEventListener("click", itemClick);
  clearButton.addEventListener("click", clearList);

  await openDatabase();

  watchList(updateList);
});

const abortController = new AbortController();

async function watchList(updateList) {
  for await (const update of PowerSync.watch("SELECT * from list", [], {
    signal: abortController.signal,
  })) {
    updateList(update);
  }
}

const updateList = (update) => {
  console.log("update", update);
  resetListElement();
  populateList(update.rows._array);
};

const itemClick = async (event) => {
  const item = event.target.innerText;
  const id = event.target.id;
  if (id) {
    editingId = id;
    inputField.value = item;
  }
};

const keyDown = async (event) => {
  if (event.key === "Enter") {
    if (!editingId) {
      insertItem(inputField.value);
    } else {
      updateItem(editingId, inputField.value);
    }
    inputField.value = "";
  }
};

const resetListElement = () => {
  itemList.innerHTML = "";
};

const populateList = (rows) => {
  for (const row of rows) {
    const li = document.createElement("li");
    li.id = row.id;
    li.innerText = row.item;
    itemList.appendChild(li);
  }
};

async function clearList() {
  await deleteAllItems();
}
