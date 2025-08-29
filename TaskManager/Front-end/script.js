

// ########################################################################
// Building interactivity with buttons and dropdown menus


const dropdownBtn = document.querySelector('.btn-dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');




// drop down menu poping up and off by clicking on the menu button on the top right side 
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


// Changing background of 'save task' button when mousing over 
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

