const dropdownBtn = document.querySelector('.btn-dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownChildren = document.querySelectorAll('.btn-dropdown-menu');
const btn = document.querySelectorAll('.btn');


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

