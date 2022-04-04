const Modal = {
    overlay: document.querySelector(".modal-overlay"),

    toggle() {
        Modal.overlay.classList.toggle('active'); // Toggle class active
    }
};

const Storage = {
    set() { // Set all lists on Local Storage
        Object.keys(List.all).forEach((list) => {
            localStorage.setItem(`${list}`, JSON.stringify(List.all[list])) 
        })
    },      

    get(list) { // Get list on Local Storage
        return JSON.parse(localStorage.getItem(list)) || [];
    }
};

const Category = {
    collection: document.getElementsByClassName('category'), // HTML Collection of categories

    selected: null, // Store the currently selected category

    addEvent() { // Add event to each category
        for(const category of Category.collection) {
            category.addEventListener('click', () => {
                Category.selected = category.getAttribute('value');

                Category.addClassActive();

                List.show();
            })
        }
    },

    addClassActive() { // Add class 'active' on category
        Category.removeClass();

        document.querySelector(`[value="${Category.selected}"]`).classList.add('active');
    },

    removeClass() { // Remove class 'active' of all collection
        for(index = 0; index < Category.collection.length; index++) {
           Category.collection[index].classList.remove('active')
        } 
    }
};

const List = {
    all: {
        workList: Storage.get('workList'),

        healthList: Storage.get('healthList'),
        
        personalList: Storage.get('personalList'),
        
        shoppingList: Storage.get('shoppingList')
    },

    get(category) { // Get list of category (parameter) 
        const categoryWork = category === 'work';
        const categoryHealth = category === 'health';
        const categoryPersonal = category === 'personal';
        const categoryShopping = category === 'shopping';

        if(categoryWork) {
            return List.all.workList;
        } else if(categoryHealth) {
            return List.all.healthList;
        } else if(categoryPersonal) {
            return List.all.personalList;
        } else if(categoryShopping) {
            return List.all.shoppingList;
        } else {
            throw new Error('Categoria não encontrada!')
        }
    },

    show() { // Show list of category selected
        const list = List.get(Category.selected);

        List.clear();

        list.forEach(DOM.addTask);

        Task.ifExists();

        DOM.toggleAttributeIfChecked();

        Storage.set();
    },

    clear() {
        DOM.taskList.innerHTML = "";
    },
};

const Task = {
    collection: document.getElementsByClassName('task'), // HTML Collection of tasks

    ifExists() { // Check if exist any task in category selected
        if(Task.collection != []) {
            Task.addEvent()
        }
    },

    addEvent() { // Add event listener to toggle the checked property for each task
        for(const task of Task.collection) {
            task.addEventListener('change', () => {
                Task.toggleCheckedProperty(task);
            })
        }
    },

    toggleCheckedProperty(task) {
        const input = document.querySelector(`#${task.htmlFor}`); // Getting label's input through the attribute 'for'
        const taskIndex = task.dataset.index;
        const list = List.get(Category.selected);

        // Check if input is checked or not
        if(input.checked) {
            list[taskIndex].checked = true; 
        } else {
            list[taskIndex].checked = false;
        }

        Storage.set();   
    },

    remove(index) { // Remove task from list
        List.get(Category.selected).splice(index, 1);
        List.show();
        Storage.set();       
    }
};

const DOM = {
    taskList: document.querySelector('.task-list'),

    addTask(task, index) { // Add task into Task List
        const divContent = document.createElement('div');
        divContent.classList.add('content');

        divContent.innerHTML = DOM.htmlTask(task, index);
        
        DOM.taskList.appendChild(divContent);
    },
    
    htmlTask(task, index) { // Return the task in HTML format
        const html = `<label for="task${index}" class="task" data-index="${index}">
        <div class="description-check">
            <input type="checkbox" id="task${index}">
            <span class="checkmark"></span>
            
            <span class="description">${task.description}</span>
        </div>
        
        <span class="time">${task.time}</span>
    </label>

    <img src="./images/trash.svg" alt="Cancelar task" class="cancel" onclick="Task.remove(${index})">`

        return html;
    },

    toggleAttributeIfChecked() {
        const list = List.get(Category.selected);

        // Check if the tasks in the list are checked
        for(index = 0; index < list.length; index++) {
        const input = document.querySelector(`#task${index}`);

        list[index].checked ? input.setAttribute('checked', true) : input.removeAttribute('checked')
        }
    }
};

const Form = {
    description: document.querySelector('#description-input'),
    time: document.querySelector('#time-input'),
    category: document.querySelector('#categories-select'),

    getValues() {
        return {
            description: Form.description.value,
            time: Form.time.value,
            checked: false,
            category: Form.category.value
        }
    },

    addInList() { // Add to the list for the category selected by user on form  
        const {description, time, checked, category} = Form.getValues();

        List.get(category).push({description, time, checked});
        Category.selected = category;
    },

    resetFields() {
        Form.description.value = "";
        Form.time.value = "";
        Form.category.value = Category.selected;
    },
    
    submit(event) {
        event.preventDefault();

        try {
            Form.addInList();
            Form.resetFields();
            Modal.toggle(); 
            Category.addClassActive();
            List.show();            
        } catch(error) {
            alert(error.message)
        }
    }    
};

const App = {
    init() {
        Category.addEvent()  
    }    
};

App.init();