const Modal = {
    overlay: document.querySelector(".modal-overlay"),

    toggle() {
        Modal.overlay.classList.toggle('active');
    }
}

const Category = {
    showCategory(category) {
        List.clearList();

        List.getList(category).forEach((task, index) => {
            DOM.addTask(task, index)
        })
    }
}

const List ={
    workList: [
        {
            checked: true,
            description: "Reunião",
            time: "19:00"
        },
        {
            checked: true,
            description: "Bater ponto",
            time: "08:00"
        }
    ],

    healthList: [
        {
            checked: false,
            description: "Marcar nutricionista",
            time: ""
        },
        {
            checked: false,
            description: "Dentista",
            time: "09:00"
        }
    ],
    
    personalList: [
        {
            checked: false,
            description: "Academia",
            time: "11:00"
        }
    ],
    
    shoppingList: [
        {
            checked: false,
            description: "Feijão",
            time: "",
        },
        {
            checked: false,
            description: "Arroz",
            time: "",
        },
        {
            checked: false,
            description: "Ovo",
            time: "",
        },
    ],

    getList(category) {
        let list;
        
        switch(category) {
            case 'category-work':
                list = List.workList;
                break;        
            case 'category-health':
                list = List.healthList;
                break;        
            case 'category-personal':
                list = List.personalList;
                break;        
            case 'category-shopping':
                list = List.shoppingList;
                break;        
        }

        return list;
    },

    clearList() {
        DOM.unorderedList.innerHTML = "";
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
        const html = `<label for="task${index}" class="task-text">
            <input type="checkbox" id="task${index}">
            <span class="checkmark"></span>
    
            <span class="description">${task.description}</span>
            <span class="time">${task.time}</span>
        </label>`
    
        return html;
    },

    checkTask() {
        
    }
}