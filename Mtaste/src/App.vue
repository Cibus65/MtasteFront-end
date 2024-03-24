
<template>
  <!DOCTYPE html>
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link href="https://fonts.googleapis.com/css2?family=Gilda+Display&display=swap" rel="stylesheet">
     <title>Mtaste</title>
 
 </head>
     <header class="header">
         <div class="intro">
         <div class="container">
             <div class="header__inner">
                     <div class="logo"><img :src="imagePath">
                         <div class="name">Mtaste</div>
                         <div class="button-top">
                             <button type="button" class="btn btn-outline-secondary enter__button">Войти</button>
                 </div>
                     </div>
                 
                 <nav class="navigation">
                     <a class="nav-link"  aria-disabled="false" href="#">Основное меню</a>
                     <a class="nav-link"  aria-disabled="false" href="#">Ингредиенты</a>
                     <a class="nav-link"  aria-disabled="false" href="#">Праздничное меню</a>
                     <nav class="navbar navbar-light bg-light">
                         <form class="form-inline">
                             <input class="form-control mr-sm-2 search__engin" type="text" placeholder="Найти рецепт...">
                             <button type="button" class="btn btn-outline-secondary search__button">Найти</button>
                         </form>
                         
                     </nav>
                 </nav>
             </div>
             <div class="alert alert-secondary main__text" role="alert">
                 <strong>Рецепты блюд основного меню: </strong>  Мы собрали подробные рецепты с фото для блюд от шефа на все случаи жизни. Для любого блюда вы можете заказать набор со всеми ингредиентами, чтобы приготовить его за 15 минут.
             </div>
             <div id="carouselExampleCaptions" class="carousel slide carousel__border">
             <div class="carousel-indicators">
                 <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                 <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                 <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
             </div>
             <div class="carousel-inner">
                 <div class="carousel-item active">
                 <img :src="img1" class="d-block w-100 heig" alt="...">
                 <div class="carousel-caption d-none d-md-block">
                     <a class="btn btn-primary btn-sm " href="#" role="button"><h5>Завтрак</h5></a>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum, leo ac vestibulum lobortis, diam arcu ornare magna, eu lobortis orci tortor nec tellus. Etiam convallis dapibus dui, sit amet gravida turpis vulputate eget. </p>
                 </div>
                 </div>
                 <div class="carousel-item">
                 <img :src="img2" class="d-block w-100 heig" alt="...">
                 <div class="carousel-caption d-none d-md-block">
                     <h5>Обед</h5>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum, leo ac vestibulum lobortis, diam arcu ornare magna, eu lobortis orci tortor nec tellus. Etiam convallis dapibus dui, sit amet gravida turpis vulputate eget. </p>
                 </div>
                 </div>
                 <div class="carousel-item">
                 <img :src="img3" class="d-block w-100" alt="...">
                 <div class="carousel-caption d-none d-md-block">
                     <h5>Ужин</h5>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum, leo ac vestibulum lobortis, diam arcu ornare magna, eu lobortis orci tortor nec tellus. Etiam convallis dapibus dui, sit amet gravida turpis vulputate eget. </p>
                 </div>
                 </div>
             </div>
             <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                 <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                 <span class="visually-hidden">Previous</span>
             </button>
             <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                 <span class="carousel-control-next-icon" aria-hidden="true"></span>
                 <span class="visually-hidden">Next</span>
             </button>
             </div>
             <div class="border__qw"></div>
 
             <div class="meal__time">
              <div class="meal__text" id="anchor" >
                <strong>Завтрак</strong>
                
              </div>
              
                      
             </div>
             <div class="meal__breakfast">
              <div class="row row-cols-1 row-cols-md-2 g-4">
                
                  <div class="col" >
                    <div class="card card1">
                      <img :src="breakfast1" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Яичница с беконом и помидорами</h5>
                        <p class="card-text">Быстрый и сытный завтрак.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  
                  <div class="col" >
                    <div class="card">
                      <img :src="breakfast2" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Заварные блины на молоке</h5>
                        <p class="card-text">Быстрый и сытный завтрак.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="breakfast3" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Овсяная каша на молоке</h5>
                        <p class="card-text">Быстрый и сытный завтрак.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="breakfast4" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Классические сырники из творога</h5>
                        <p class="card-text">Быстрый и сытный завтрак.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="breakfast5" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Сэндвич с ветчиной и сыром</h5>
                        <p class="card-text">Быстрый и сытный завтрак.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="breakfast6" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Манная каша на воде</h5>
                        <p class="card-text">Быстрый и сытный завтрак.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                
                </div>
             </div>
             <div class="border__qw"></div>
             <div class="meal__time">
              <div class=" meal__text" >
                <strong>Обед</strong>
              </div>
          
             </div>
             <div class="meal__breakfast">
              <div class="row row-cols-1 row-cols-md-2 g-4">
                  <div class="col">
                    <div class="card">
                      <img :src="img__error" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="img__error" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="img__error" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="img__error" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="img__error" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="img__error" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
             <div class="border__qw"></div>
             <div class="meal__time">
              <div class=" meal__text" >
                <strong>Ужин</strong>
                
              </div>
              
              
             </div>
             <div class="meal__breakfast">
              <div class="row row-cols-1 row-cols-md-2 g-4">
                  <div class="col">
                    <div class="card">
                      <img :src="img__error" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="img__error" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="img__error" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="img__error" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="img__error" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <img :src="img__error" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a class="btn btn-primary btn-sm meal_btn " href="#" role="button">Готовить </a>
                      </div>
                      
                    </div>
                    <div>
                      <div>
                        
                      </div>
                    </div>
                  </div>
                </div>
             </div>
             
         </div>
     </div>
             
     
 
         
     
     </header>
     
 </template>


 
<script>
 
 import anim from './animation'

 import image from '@/assets/img/logo.jpg';
 import img1 from  '@/assets/img/img1.jpg';
 import img2 from  '@/assets/img/img2.jpg';
 import img3 from  '@/assets/img/img3.jpg';
 import breakfast1 from  '@/assets/img/breakfast1.jpg';
 import breakfast2 from  '@/assets/img/breakfast2.jpg';
 import breakfast3 from  '@/assets/img/breakfast3.jpg';
 import breakfast4 from  '@/assets/img/breakfast4.jpg';
 import breakfast5 from  '@/assets/img/breakfast5.jpg';
 import breakfast6 from  '@/assets/img/breakfast6.jpg';
 import img__error from  '@/assets/img/img_error.jpg';



 
anim()  
 

 export default {
  data() {
    return {
      imagePath: image,
       img1: img1,
       img2: img2,
       img3: img3,
       breakfast1: breakfast1,
       breakfast2: breakfast2,
       breakfast3: breakfast3,
       breakfast4: breakfast4,
       breakfast5: breakfast5,
       breakfast6: breakfast6,
       img__error: img__error,
       
       
    };
  },

 
  
 
 };
 


</script>
 
 
<style scoped>
 
 body{
     margin: 0;
     font-family: "Gilda Display", serif;
     max-width: 1440px;
     font-size: 15px;
     color: #fff;
     width: 100%;
     height: 100%;
 }
 
 *, *:before, *:after{
     box-sizing: border-box;
 }
 .intro{
     width:100%;
     height: 100vh;
     -webkit-background-size: cover;
     background-size: cover;
 }
 
 .header{
     width: 100%;
     
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     z-index: 1000;
 }
 
 .containder{
     width: 100%;
     max-width: 1440px;
     margin: 0 auto;
     display: flex;
     border: 1px solid;
     
 }
 .logo{
     display: flex;
     font-size: 40px;
     font-family: "Gilda Display", serif;
     color:rgba(2, 96, 74, 1);
     font-weight: 700;
     border-bottom: 1px solid;
     
 }
 .name{
     justify-content: center;
     margin-top: 20px;
     margin-left: 5px;
 }
 .navigation{
     font-size: 30px;
     font-family: "Gilda Display", serif;
     display: flex;
     color: rgba(2, 96, 74, 1);
     
     border-bottom: 1px solid;
     
 }
 .nav-link{
     margin-top: 15px;
     margin-right: 70px;
     margin-left: 15px;
     
 }
 
 .form-inline{
     display: flex;
     background-color: #fff;
     font-family: "Gilda Display", serif;
     width: 281px;
     
     
     
 }
 .enter__button{
     margin-top: 30px;
     position: absolute; left: 75%;
     width: 100px;
    
    
 }
 
 
 
 .search__button{
     margin-top: 5px;
     width: 140px;
     height: 45px;
     border-top-left-radius: 0px;
     border-bottom-left-radius: 0px;
     border-top-right-radius: 10px;
     border-bottom-right-radius: 10px;
 }
 .search__engin{
     margin-top: 5px;
     border-top-right-radius: 0px;
     border-bottom-right-radius: 0px;
     border-top-left-radius: 10px;
     border-bottom-left-radius: 10px;
 }
 
 .bg-light{
     --bs-bg-opacity: 0;
     
 }
 .btn-outline-secondary{
     color:#fff;
 }
 input:focus {
   box-shadow: 0 0 10px rgba(2, 96, 74, 1);
 }
 .btn {
     background-color: rgba(2, 96, 74, 1);
     border-color: rgba(2, 96, 74, 1);
     font-family: "Gilda Display", serif;
     
     
 }
 .btn:hover{
     background-color: rgb(1, 76, 59); 
 }
 
 .btn:focus{
     box-shadow: 0 0 10px rgb(3, 97, 75);
 }
 .main__text{
  
     margin-top: 10px;
     background-color: rgba(1, 76, 58, 0.146);
     
 }
 
 .card-text{
  border-top: 1px solid;
  border-color: rgb(194, 194, 194);
 }

 
.meal__text{

    opacity: 0;
    
    max-width: 200px;
    position: absolute;
    left: 49%;
    font-size: 65px;
    transform: translate(-50%, -50%);
    margin-top: 100px;
    
    font-family: "Gilda Display", serif;
    color:  rgb(1, 76, 59); 

  
}
.meal__text.visible{
  opacity: 1;
  transition: all 1s;

}
.meal__breakfast{
  margin-top: 200px;
}
.meal_btn{
  
  position: relative;
  
  left: 75%;
  width: 120px;
}
.border__qw{
  opacity: 0;
  border-bottom: 2px solid;
  margin-top: 90px;
  color:rgb(1, 76, 59);
}
.border__qw.visible{
  opacity: 1;
  transition: all 1.5s;
}

.col{
  opacity: 0;
  -webkit-transform: translateX(-50px);
  -ms-transform: translateX(-50px);
  transform: translateX(-20px);
  
  
}

.col.visible{
  opacity: 1;
  
  
  -webkit-transform: translateX(0px);
  -ms-transform: translateX(0px);
  transform: translateX(0px);
  -webkit-transition: all 1.5s;
  -o-transition: all 1.5s;
  transition: all 1.5s;
}



 </style>