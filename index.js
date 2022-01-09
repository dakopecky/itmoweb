let storage = window.localStorage

function count_active_tasks() {
    let keys = Object.keys(storage)

    let task_cnt = keys.length;
    for (let i = 0; i < keys.length; i++) {
        const task_date = JSON.parse( storage.getItem(keys[i]))
        if (task_date.completed) {
            task_cnt--;
        }
    }

    return task_cnt
}

function count_completed_tasks() {
    let all_tasks = Object.keys(storage).length
    return all_tasks - count_active_tasks()
}

function add_task_cnt() {
    let task_cnt = count_active_tasks()
    let cnt_message = task_cnt.toString()
    if (task_cnt === 1) {
        document.getElementById('cnt').innerHTML = cnt_message + ' item left'
    } else {
        document.getElementById('cnt').innerHTML = cnt_message + ' items left'
    }
}

function update_clear() {
    if (count_completed_tasks() !== 0) {
        document.getElementById('clear').className = 'active_clear';
    } else {
        document.getElementById('clear').className = 'inactive_clear';
    }
}

function add_task() {
    let input_task = document.getElementById('input-task');
    let task_value = input_task.value.trim()
    if (task_value.length !== 0) {
        let unique_id = Date.now().toString()
        add_todo(false, task_value, unique_id);

        add_task_cnt();
        
        let filter = Array.from(document.getElementsByClassName('todo-filter'))[0];
        filter.style.display = 'flex';

        let task_date = {
            completed: false,
            value: task_value
        }
        storage.setItem(unique_id, JSON.stringify(task_date));
        
    }
    input_task.value = '';
    show_all();
}

function add_todo(task_status, task_value, id) {
    let label = document.createElement("label");
    label.setAttribute('for', id);
    label.appendChild(document.createTextNode(task_value));
    
    let checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", id);
    checkbox.setAttribute("onclick", "change_status(this)");
    checkbox.checked = task_status;

    let ul = document.getElementById('task-list');
    let li = document.createElement('li');
    li.appendChild(checkbox);
    li.appendChild(label);
    ul.appendChild(li);
}

function clear_tasks() {
    let keys = Object.keys(storage)

    for (let i = 0; i < keys.length; i++) {
        const task_date = JSON.parse( storage.getItem(keys[i]))
        if (task_date.completed) {
            storage.removeItem(keys[i]);
        }
    }
    
    let tasks = Array.from(document.getElementById('todo-task-form').elements);
    
    for (let task of tasks) {
        if (task.checked) {
            task.parentElement.remove();
        }
    }
    
    if (Object.keys(storage).length === 0) {
        let filter = Array.from(document.getElementsByClassName('todo-filter'))[0];
        filter.style.display = 'none';
    }

    update_clear();
}

function change_status(element) {
    let task = document.getElementById(element.id);
    
    const old_data = JSON.parse(storage.getItem(task.id))
    const task_data = JSON.stringify({...old_data, completed: task.checked})
    storage.setItem(task.id, task_data);

    add_task_cnt();
    update_clear();
}

window.onload = show_all;
    
function show_all() {
    document.getElementById('all').className = 'selected';
    document.getElementById('active').className = 'not-selected';
    document.getElementById('completed').className = 'not-selected';
    
    let keys = Object.keys(storage)
    keys.sort()
    
    if (keys.length) {
        let filter = Array.from(document.getElementsByClassName('todo-filter'))[0];
        filter.style.display = 'flex';
    }

    document.getElementById('task-list').innerHTML = '';
    
    for (let i = 0; i < keys.length; i++) {
        const task_date = JSON.parse( storage.getItem(keys[i]));
        add_todo(task_date.completed, task_date.value, keys[i]);
    }

    add_task_cnt();
    update_clear();
}

function show_active() {
    document.getElementById('all').className = 'not-selected';
    document.getElementById('active').className = 'selected';
    document.getElementById('completed').className = 'not-selected';
    
    let keys = Object.keys(storage)
    keys.sort()

    document.getElementById('task-list').innerHTML = ''

    for (let i = 0; i < keys.length; i++) {
        const task_date = JSON.parse( storage.getItem(keys[i]))
        if (!task_date.completed) {
            add_todo(task_date.completed, task_date.value, keys[i]);
        }
    }
    
    update_clear();
}

function show_completed() {
    document.getElementById('all').className = 'not-selected';
    document.getElementById('active').className = 'not-selected';
    document.getElementById('completed').className = 'selected';
    
    let keys = Object.keys(storage)
    keys.sort()

    document.getElementById('task-list').innerHTML = ''

    for (let i = 0; i < keys.length; i++) {
        const task_date = JSON.parse( storage.getItem(keys[i]))
        if (task_date.completed) {
            add_todo(task_date.completed, task_date.value, keys[i]);
        }
    }
    
    update_clear();
}
