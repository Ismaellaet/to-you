const Modal = {
    overlay: document.querySelector(".modal-overlay"),

    toggle() {
        Modal.overlay.classList.toggle('active');
    }
}

const Storage = {
    set(lists) {
        Object.keys(lists).forEach((list) => {
            localStorage.setItem(`${list}`, JSON.stringify(lists[list])) 
        })
    },      

    get(list) {
        return JSON.parse(localStorage.getItem(list)) || [];
    }
}

const Category = {
    show(category) {
        const list = List.get(category);

        Category.active(category);
        List.clear();

        list.forEach((task, index) => {
            
            DOM.addTask(task, index);
            DOM.checkTask(task, index);
            DOM.eventCheck(task, index);  
            List.remove(list, index, category)
            Storage.set(List.all)   
        })
    },

    active(category) {
        Category.removeActive();

        document.querySelector(`#${category}`).classList.add('active');
    },

    removeActive() {
        const categories = document.querySelector('.categories-list').children
       for(index = 0; index < categories.length; index++) {
           categories[index].classList.remove('active')
       } 
    }
}

const List = {
    all: {
        workList: Storage.get('workList'),

        healthList: Storage.get('healthList'),
        
        personalList: Storage.get('personalList'),
        
        shoppingList: Storage.get('shoppingList')
    },

    get(category) {
        let list;
        
        switch(category) {
            case 'category-work':
                list = List.all.workList;
                break;        
            case 'category-health':
                list = List.all.healthList;
                break;        
            case 'category-personal':
                list = List.all.personalList;
                break;        
            case 'category-shopping':
                list = List.all.shoppingList;
                break;        
        }

        return list;
    },

    clear() {
        DOM.taskList.innerHTML = "";
    },

    insert(task, category) {
        List.get(category).push(task);
        
        Category.show(category);
    },

    remove(list, index, category) {
        const element = document.querySelector(`#cancel${index}`);

        element.addEventListener('click', () => {
            list.splice(index, 1);
            Category.show(category);
            Storage.set(List.all)
        })
    }
}

const DOM = {
    taskList: document.querySelector('.task-list'),
    addTask(task, index) {
        const divContent = document.createElement('div');
        divContent.classList.add('content');

        divContent.innerHTML = DOM.htmlTask(task, index);
        DOM.taskList.appendChild(divContent);
    },
    
    htmlTask(task, index) {
        const html = `<label class="task">
        <div class="description-check">
            <input type="checkbox" id="task${index}">
            <span class="checkmark"></span>
            
            <span class="description">${task.description}</span>
        </div>
        
        <span class="time">${task.time}</span>
    </label>

    <img src="./images/trash.svg" alt="Cancelar task" class="cancel" id="cancel${index}">`
    
        return html;
    },

    checkTask(task, index) {
        const element = document.querySelector(`#task${index}`);

        task.checked ? element.setAttribute('checked', 'true') : element.removeAttribute('checked')
    },

    eventCheck(task, index) {
        const element = document.querySelector(`#task${index}`);

        element.addEventListener('click', () => {
            task.checked = !task.checked;
            DOM.checkTask(task, index);
            Storage.set(List.all);
        })       
    },
}

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

    clearFields() {
        Form.description.value = "";
        Form.time.value = "";
        Form.category.value = "category-work";
    },
    
    submit(event) {
        event.preventDefault();

        try {
            const {description, time, checked, category} = Form.getValues();
            List.insert({description, time, checked}, category);
            Form.clearFields()
            Modal.toggle();

        } catch(error) {
            alert(error.message)
        }
    }    
}
