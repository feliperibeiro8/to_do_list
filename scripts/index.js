// Seleção de elementos
const form = document.querySelector("#form");
const input= document.querySelector("#input");
const list = document.querySelector("#list");
const description = document.querySelector("#description")
const editForm = document.querySelector("#edit-form");
const editTitle = document.querySelector("#edit-title");
const editDesc = document.querySelector("#edit-description");
const cancelEdition = document.querySelector("#cancel-edit-btn");
const cleanSearch = document.querySelector("#erase-button");
const searchInput = document.getElementById("search-input")
const noResults = document.querySelector("#no-results")
const filterSelect = document.querySelector("#filter-select")

let oldTitleValue;
let oldDescValue;

// Funções
const saveTodo = (text1, text2) => {
    const todo = document.createElement("div")
    todo.classList.add("todo");
    todo.classList.add("pending");

    const text = document.createElement("div")
    text.classList.add("text")

    const title = document.createElement("h3")
    title.innerText = text1
    text.appendChild(title);

    const todoDescription = document.createElement("p")
    todoDescription.innerText = text2
    text.appendChild(todoDescription);

    const buttons = document.createElement("div")
    buttons.classList.add("buttons");

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    buttons.appendChild(doneBtn);

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    buttons.appendChild(editBtn);

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    buttons.appendChild(deleteBtn);

    todo.appendChild(text);
    todo.appendChild(buttons);
    list.appendChild(todo);

    input.value = ""
    description.value = ""
    input.focus()
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    form.classList.toggle("hide");
    list.classList.toggle("hide");
};

const updateTodo = (title, subtitle) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let input = todo.querySelector("h3");
        let desc = todo.querySelector("p");

        if (input.innerText === oldTitleValue && desc.innerText === oldDescValue) {
            input.innerText = title;  
            desc.innerText = subtitle;    
        }
    });
};

const clean = () => {
    const searchTitle = document.querySelector("#search-input")
    searchTitle.value = "";
    searchTitle.focus()
};

const formatString = (value) => {
    return value.toLowerCase().trim();
};

// Eventos
form.addEventListener("submit", (e) =>{
    e.preventDefault();

    const inputValue = input.value;
    const descValue = description.value;
    if(inputValue) {
        saveTodo(inputValue, descValue);
    }
}); 

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest(".todo");
    
    let title_current;
    let desc_current;

    if (parentEl && parentEl.querySelector("h3")){
        title_current = parentEl.querySelector("h3").innerText;
        desc_current = parentEl.querySelector("p").innerText;
    }

    if (targetEl.classList.contains("finish")) {
        parentEl.classList.toggle("done");
    }
    
    if (targetEl.classList.contains("remove")) {
       parentEl.remove();
    }

    if (targetEl.classList.contains("edit")) {
        toggleForms();

        editTitle.value = title_current;
        editDesc.value = desc_current;
        oldTitleValue = title_current;
        oldDescValue = desc_current;
    }
})

cancelEdition.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener("submit", (e) =>{
    e.preventDefault()

    const editTitleValue = editTitle.value
    const editDescValue = editDesc.value

    if (editTitleValue) {
        updateTodo(editTitleValue, editDescValue)
    }

    toggleForms()
})

cleanSearch.addEventListener("click", (e) =>{
    e.preventDefault()
    clean()

    const todos = document.querySelectorAll("#list .todo");
    noResults.classList.add("hide");
    todos.forEach(item => {
        item.style.display = 'flex'
    });
    
})

searchInput.addEventListener("input", (e) => {
    const value = formatString(e.target.value)
    let counter = 0;
    const todos = document.querySelectorAll("#list .todo");

    todos.forEach(item => {
        if(formatString(item.querySelector("h3").textContent).indexOf(value) !== -1){
            item.style.display = 'flex';
            counter += 1;
        } else {
            item.style.display = 'none'
        }
    });

    if (counter === 0) {
        noResults.classList.remove("hide")
    } else {
        noResults.classList.add("hide")
    }
})

filterSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    const items = document.querySelectorAll("#list .todo");

    items.forEach(todo => {
        if (value === "all") {
            todo.style.display = "flex";
        } else if (todo.classList.contains(value)) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    })
})
