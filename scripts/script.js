const Modal = {
    overlay: document.querySelector(".modal-overlay"),

    toggle() {
        Modal.overlay.classList.toggle('active');
    }
}

const Storage = {
    set(obj) {
        Object.keys(obj).forEach((item) => {
            localStorage.setItem(`${item}`, JSON.stringify(obj[item])) 
        })
    },

      

    get(list) {
        return JSON.parse(localStorage.getItem(list)) || [];
    }
}


const Category = {
    showCategory(category) {
        const list = List.get(category);

        Category.active(category);
        List.clear();

        list.forEach((task, index) => {
            
            DOM.addTask(task, index);
            DOM.checkTask(task, index);
            DOM.eventCheck(task, index);   
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

const List ={
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
        DOM.unorderedList.innerHTML = "";
    },

    insert(task, category) {
        List.get(category).push(task);
        
        Category.showCategory(category);
    }
}

const DOM = {
    unorderedList: document.querySelector(".task-list"),

    addTask(task, index) {
        const li = document.createElement('li');
        li.classList.add('task');
        
        li.innerHTML = DOM.htmlTask(task, index);
        DOM.unorderedList.appendChild(li)
    },

    htmlTask(task, index) {
        const html = `<label for="task${index}" class="task-text" >
            <input type="checkbox" id="task${index}">
            <span class="checkmark"></span>
    
            <span class="description">${task.description}</span>
            <span class="time">${task.time}</span>
        </label>`
    
        return html;
    },

    checkTask(task, index) {
        const element = document.querySelector(`#task${index}`);

        task.checked ? element.setAttribute('checked', 'true') : element.removeAttribute('checked')
    },

    eventCheck(task, index) {
        const element = document.querySelector(`#task${index}`);

        element.addEventListener('click', () => {

            task.checked = !task.checked
            DOM.checkTask(task, index);
            Storage.set(List.all)
        })       
    }
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
        Form.category.value = "";
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



