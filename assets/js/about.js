const collapse = document.querySelectorAll('.collapse');
const collapseBtn = document.querySelectorAll('.collapse button');

for (let i = 0; i < collapseBtn.length; i++) {
    collapseBtn[i].addEventListener("click", function(e) {
        expandir(i);
    });
}

const expandir = (i) => {
    collapse[i].classList.toggle('coll-active');
};