
export default function(){

// Функция, которая будет вызываться при каждом событии скролла
function handleScroll() {
    // Получаем текущую позицию скролла
    var scrollPosition = window.scrollY;
  
    // Получаем элемент, который нужно сделать видимым
    var elements_col = document.getElementsByClassName('col');
    var elements_meal__text = document.getElementsByClassName('meal__text');
    var elements_border__qw = document.getElementsByClassName('border__qw');
    
    
    for(var element of elements_col){
      if(element.classList.contains('visible')){
        continue;
      }
    // Устанавливаем позицию, в которой элемент должен стать видимым
      var visiblePosition = element.offsetTop;
    
      // Если позиция скролла больше или равна позиции видимости элемента
      if (scrollPosition >= visiblePosition - 700) {
        // Добавляем класс, который делает элемент видимым
        element.classList.add('visible');
      } 
    }
  
    for(var element of elements_meal__text){
      if(element.classList.contains('visible')){
        continue;
      }
   
      var visiblePosition = element.offsetTop;
    
      
      if (scrollPosition >= visiblePosition - 700) {
        
        element.classList.add('visible');
      }
    }

    for(var element of elements_border__qw){
      if(element.classList.contains('visible')){
        continue;
      }
   
      var visiblePosition = element.offsetTop;
    
      
      if (scrollPosition >= visiblePosition - 700) {
        
        element.classList.add('visible');
      }
    }
    
  }
  
  
  // Добавляем обработчик события скролла на окно
  window.addEventListener('scroll', handleScroll);
  
  // Вызываем функцию при загрузке страницы, чтобы сразу проверить, нужно ли сделать элемент видимым
  handleScroll();
}