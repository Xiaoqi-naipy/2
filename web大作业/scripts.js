let tasks = []

function renderEditor() {
    let inputEl = document.querySelector("#default-todo-panel .todo-editor > input")
    let addTask = () => {

        let newTask = {
            title: inputEl.value,
            done: false,
        }
        tasks.push(newTask)
        inputEl.value = ""


        renderTaskItenms();
    }

    inputEl.onkeypress = (e) => {
        if (e.key == 'Enter') {
            addTask();
        }
    }

    let addEl = document.querySelector("#default-todo-panel .todo-editor > button")
    addEl.onclick = (e) => {
        addTask()
    }
}

function renderTaskItenms() {
    let itemsEl = document.querySelector("#default-todo-panel .todo-items");
    itemsEl.querySelectorAll('div').forEach((Node) => Node.remove())
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i]
        let itemEl = document.createElement('div')

        let doneEl = document.createElement('input')
        doneEl.type = 'checkbox'
        itemEl.append(doneEl)

        let titleEl = document.createElement('label')
        titleEl.innerText = task.title
        itemEl.append(titleEl)

        let cancelEl = document.createElement('button')
        cancelEl.innerText = "×";
        cancelEl.onclick = () => {
            tasks.splice(i, 1);
            renderTaskItenms()
        }
        itemEl.append(cancelEl)

        itemsEl.append(itemEl)
    }
}
renderEditor()
renderTaskItenms()