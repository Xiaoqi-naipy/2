let tasks = []
let importitems = 0;

function renderEditor() {
    let inputEl = document.querySelector("#default-todo-panel .todo-editor > input")
    let addTask = () => {
        if (inputEl.value.length == 0) {
            return;
        }
        let newTask = {
            title: inputEl.value,
            done: false,
        }
        tasks.push(newTask)
        inputEl.value = ""


        renderTaskItems();
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

function renderTaskItems() {
    let itemsEl = document.querySelector("#default-todo-panel .todo-items");
    itemsEl.querySelectorAll('div').forEach((Node) => Node.remove())
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i]
        let itemEl = document.createElement('div')
        itemEl.className = 'task'

        let doneEl = document.createElement('input')
        doneEl.type = 'checkbox'

        //事件完成
        doneEl.checked = task.done
        if (task.done) {
            itemEl.classList.add('done')

        } else {
            itemEl.classList.remove('done')
        }

        doneEl.onchange = (e) => {
            task.done = e.target.checked
            if (task.done) {
                itemEl.classList.add('done')

            } else {
                itemEl.classList.remove('done')
            }
        }
        itemEl.append(doneEl)

        let titleEl = document.createElement('label')
        titleEl.innerText = task.title
        itemEl.append(titleEl)


        let ctrlbarEl = renderTaskCtrlbar(task, itemEl, i)

        itemEl.append(ctrlbarEl)

        itemsEl.append(itemEl)
    }
}

function renderTaskCtrlbar(task, itemEl, taskIdx) {
    let ctrlbarEl = document.createElement('div')
    ctrlbarEl.className = "ctrlbar"

    let impEl = document.createElement('input');
    impEl.type = 'checkbox'
    impEl.checked = task.import;
    if (task.import) {
        itemEl.classList.add('import')
    } else {
        itemEl.classList.remove('import')
    }
    impEl.onchange = (e) => {
        task.import = e.target.checked;
        if (task.import) {
            itemEl.classList.add("import");
            let t = task;
            for (let j = taskIdx; j > 0; j--) {
                tasks[j] = tasks[j - 1];
            }
            tasks[0] = t;
            importitems++;
        } else {
            itemEl.classList.remove("import");
            let t = task;
            for (let j = taskIdx; j < tasks.length - 1; j++) {
                tasks[j] = tasks[j + 1];
            }
            tasks[tasks.length - 1] = t;
            importitems--;
        }
        renderTaskItems();

    }

    ctrlbarEl.append(impEl);


    let upEl = document.createElement('button')
    if (taskIdx === 0 || taskIdx === importitems) {
        upEl.disabled = true;
    }
    upEl.innerText = "⬆";
    upEl.onclick = () => {
        let t = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx - 1];
        tasks[taskIdx - 1] = t;
        renderTaskItems();


    }
    ctrlbarEl.append(upEl)

    let downEl = document.createElement('button')
    downEl.innerText = "⬇";
    if (taskIdx === tasks.length - 1 || taskIdx === importitems - 1) {
        downEl.disabled = true;
    }
    downEl.onclick = () => {
        let t = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx + 1];
        tasks[taskIdx + 1] = t;
        renderTaskItems();

    }
    ctrlbarEl.append(downEl)

    let cancelEl = document.createElement('button')
    cancelEl.innerText = "×";
    cancelEl.onclick = () => {
        let flag = confirm(`您确定删除'${task.title}'这个待办项吗`);
        if (flag) {
            tasks.splice(taskIdx, 1);
            renderTaskItems();
        }

    }

    ctrlbarEl.append(cancelEl)

    return ctrlbarEl;
}
renderEditor()