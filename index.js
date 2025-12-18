let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");


function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    return JSON.parse(saved);
  }
  return items;
}

// ---- создание элемента задачи ----
function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content
    .querySelector(".to-do__item")
    .cloneNode(true);

  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(
    ".to-do__item-button_type_delete"
  );
  const duplicateButton = clone.querySelector(
    ".to-do__item-button_type_duplicate"
  );
  const editButton = clone.querySelector(
    ".to-do__item-button_type_edit"
  );

  textElement.textContent = item;

  // удалить задачу
  deleteButton.addEventListener("click", () => {
    clone.remove();
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  // скопировать задачу
  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  // редактировать задачу (доп. задание)
  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false");
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  return clone;
}

// ---- собрать задачи из DOM ----
function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach((el) => {
    tasks.push(el.textContent);
  });
  return tasks;
}

// ---- сохранить задачи в localStorage ----
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ---- начальная отрисовка ----
items = loadTasks();
items.forEach((item) => {
  const element = createItem(item);
  listElement.append(element);
});

// ---- обработчик формы ----
formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const value = inputElement.value.trim();
  if (!value) {
    return;
  }

  const newItem = createItem(value);
  listElement.prepend(newItem);

  // обновить список задач и сохранить
  items = getTasksFromDOM();
  saveTasks(items);

  inputElement.value = "";
});
