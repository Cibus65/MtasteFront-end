
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
            <div id="carouselExampleCaptions" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img :src="img4" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Завтрак</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum, leo ac vestibulum lobortis, diam arcu ornare magna, eu lobortis orci tortor nec tellus. Etiam convallis dapibus dui, sit amet gravida turpis vulputate eget. </p>
                </div>
                </div>
                <div class="carousel-item">
                <img :src="img2" class="d-block w-100" alt="...">
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


        </div>
    </div>
            
            

        
    
    </header>
    
</template>

<script>
import image from '@/assets/img/logo.jpg';
import img1 from  '@/assets/img/img1.jpg';
import img2 from  '@/assets/img/img3.jpg';
import img3 from  '@/assets/img/img9.jpg';
import img4 from  '@/assets/img/img7.jpg';

export default {
  data() {
    return {
      imagePath: image,
      img1: img1,
      img2: img2,
      img3: img3,
      img4: img4,
    }
  }
}
</script>


<style scoped>

body{
    margin: 0;
    font-family: "Gilda Display", serif;
    max-width: 1440px;
    font-size: 15px;
    color: #fff;
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
  box-shadow: 0 0 10px rgb(5, 170, 131);
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

</style>