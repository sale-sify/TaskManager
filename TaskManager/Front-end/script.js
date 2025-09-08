

// ########################################################################
// Building interactivity with buttons and dropdown menus

// drop down menu poping up and off by clicking on the menu button on the top right side 
const dropdownBtn = document.querySelector('.btn-dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownBtn.addEventListener('click', 
    function () {
        if (dropdownMenu.style.display === 'none') {
            dropdownMenu.style.display = 'flex';
        } else {
            dropdownMenu.style.display = 'none';
        }
    }
);    


// Changing background of all buttons when mousing over the buttons 
const btn = document.querySelectorAll('.btn');

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('mouseenter', 
        function () {
            this.style.background = 'rgba(238, 235, 235, 1)';
        }
    )
};

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('mouseleave', 
        function () {
            this.style.background = 'rgb(223, 222, 222)';
        }
    )
};


// Changing background of 'save task' button when mousing over it
const btnSaveTask  = document.querySelector('#save-task');

btnSaveTask.addEventListener('mouseenter', 
    function () {
        btnSaveTask.style.background = '#a951acff'        
    }
);

btnSaveTask.addEventListener('mouseleave', 
    function () {
        btnSaveTask.style.background = '#852488'        
    }
);


// Making 'new-task-btn' leading to th new task page by clicking and back to main page 
const newTaskBtn = document.querySelectorAll('.new-task-btn');
const newTaskPage = document.querySelector('.new-task-page');

for (let i = 0; i < newTaskBtn.length; i++) {
    newTaskBtn[i].addEventListener('click', 
        function () {
            newTaskPage.style.display = 'flex'
        }
    )
};

const closingBtn = document.querySelector('.closing-btn');
closingBtn.addEventListener('click', 
    function () {
        newTaskPage.style.display = 'none'
        alert("You'll loose all the informations written to create a new task if you close this page ")
    }
);




// Saving a new task and send the information to the DB throught the route '/save/newtask'

btnSaveTask.addEventListener('click', 
    function () {
        const name = document.querySelector('#input-name').value;
        const priority = document.querySelector('#dropdown-priority').value;
        const newTag = document.querySelector('#input-new-tag').value;
        const date = document.querySelector('#input-date').value;
        const description = document.querySelector('#input-description').value;



        const data = {
            name: name,
            description: description,
            priority: priority,
            tags: newTag,
            date: date
        }


        fetch('http://localhost:3000/save/newtask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        });
    }
);



// Display tasks on the main container  

const urlTasks = 'http://localhost:3000/tasks'

fetch(urlTasks)
    .then(response = response.json())
    .then((data) => {
        for (let i = 0; i < data.tasks.length; i++) {
            
            document.querySelector('.main').innerHTML += `
                <div class="task-container">
                <div class="task">
                    
                    <button class="btn-done btn"><img src="/Front-end/UI-Kit/square-checkbox.png" alt="UI cross when task done"></button>
                    <h6 class="task-name">${data.tasks[i].name}</h6>
                    <p class="task-priority">${data.tasks[i].priority}</p>
                    <p class="task-time">${data.tasks[i].date}</p>
                    <p class="task-tag">${data.tasks[i].tags}</p>
                    <div class="task-btn-dropdown">
                        <button class="task-btn-menu btn">
                            <img id="UI-checkbox" src="/Front-end/UI-Kit/menu.png" alt="UI Menu button">
                        </button>
                        <div class="task-dropdown-menu">
                            <button class="task-btn-dropdown-menu">Nouvelle Tache</button>
                            <button class="task-btn-dropdown-menu">Parametres</button>
                            <button class="task-btn-dropdown-menu">Preferences</button>
                        </div>
                    </div>

                </div>
            </div>
            `
        }
        
    })


