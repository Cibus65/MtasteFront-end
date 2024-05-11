
export default function addVisibleClass() {

    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            var elements = document.getElementsByClassName('card');
            for (var i = 0; i < 4 && i < elements.length; i++) {
                elements[i].classList.add('visible');
            }
        }, 500); 
    });
}


addVisibleClass();