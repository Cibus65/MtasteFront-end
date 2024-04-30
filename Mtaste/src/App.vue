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

              <button class="btn btn-outline-secondary enter__button" v-if="!isAuthenticated" @click="openModal">Войти</button>
              <auth-modal :show="showModal" @close="closeModal"></auth-modal>


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
          <strong>Рецепты блюд основного меню: </strong>  Мы собрали подробные рецепты с фото для блюд от шефа на все случаи жизни. Для любого блюда вы можете заказать набор со всеми ингредиентами, чтобы приготовить его за 15 минут.
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
                <a class="btn btn-primary btn-sm carousel_btn " href="#elementToScrollTo1" role="button" @click="scrollToElement"><h5 class="Inform">Завтрак</h5></a>
                <p class="Inform_main">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum, leo ac vestibulum lobortis, diam arcu ornare magna, eu lobortis orci tortor nec tellus. Etiam convallis dapibus dui, sit amet gravida turpis vulputate eget. </p>
              </div>
            </div>
            <div class="carousel-item">
              <img :src="img2" class="d-block w-100 heig" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <a class="btn btn-primary btn-sm carousel_btn " href="#elementToScrollTo2" role="button" @click="scrollToElement"><h5 class="Inform">Обед</h5></a>
                <p class="Inform_main">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum, leo ac vestibulum lobortis, diam arcu ornare magna, eu lobortis orci tortor nec tellus. Etiam convallis dapibus dui, sit amet gravida turpis vulputate eget. </p>
              </div>
            </div>
            <div class="carousel-item">
              <img :src="img3" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <a class="btn btn-primary btn-sm carousel_btn " href="#elementToScrollTo3" role="button" @click="scrollToElement"><h5 class="Inform">Ужин</h5></a>
                <p class="Inform_main">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum, leo ac vestibulum lobortis, diam arcu ornare magna, eu lobortis orci tortor nec tellus. Etiam convallis dapibus dui, sit amet gravida turpis vulputate eget. </p>
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

        <div>
          <!-- Ваша разметка с карточками -->
          <div class="card-container">
            <div v-for="(card, index) in cards" :key="index" class="card">
              <img :src="card.img" alt="Изображение блюда">
              <h3>{{ card.name }}</h3>
              <button>Готовить</button>
            </div>
          </div>
        </div>

      </div>
    </div>





  </header>

</template>



<script>

import anim from './animation';
import VueScrollTo from 'vue-scrollto';
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
import AuthModal from './components/AuthModal.vue';
import axios from 'axios';


anim()


export default {
  components: {
    AuthModal
  },
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

      isAuthenticated: false,
      showModal: false,
      cards: [],
      batchCount: 5,
      currentPage: 1

    };

  },
  name: 'App',
  directives: {
    scrollTo: VueScrollTo.directive

  },
  mounted() {
    this.loadMoreCards();
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    openModal() {
      this.showModal = false; // Сбрасываем состояние модального окна
      this.$nextTick(() => {
        this.showModal = true; // Устанавливаем состояние модального окна
        this.isAuthenticated = false;
      });
    },
    closeModal() {
      this.showModal = false; // Сбрасываем состояние модального окна
      this.isAuthenticated = true;
    },
    scrollToElement() {
      // id элемента, к которому нужно перейти
      const elementId = '#elementToScrollTo';
      // Прокрутка к элементу с заданным id
      this.$scrollTo.scrollTo(elementId, 1500); // 1500 - это длительность анимации скролла в миллисекундах
    },
    handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.currentPage+=1
        this.loadMoreCards();
      }
    },
    loadMoreCards() {
      axios.get(`http://0.0.0.0:8080/Mtaste/API/getRecipeByPage/${this.currentPage}`)
          .then(response => {
            const additionalCardsData = response.data; // Получаем массив данных карточек из ответа
            additionalCardsData.forEach(cardData => {
              // Создаем объект карточки из данных
              const card = {
                name: cardData.name,
                img: cardData.img,
                // Добавляем другие данные, если они есть
              };
              // Добавляем карточку к массиву cards
              this.cards.push(card);
            });
            this.currentPage += 1;
          })
          .catch(error => {
            console.error('Ошибка при загрузке карточек:', error);
          });
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
  z-index: 100;
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
.card{

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

.carousel_btn{
  height: 35px;
  background-color: rgba(2, 96, 74, 0);
  border: none;
  padding-bottom: 5px;

  font-family: "Gilda Display", serif;
}
.carousel_btn:hover{
  background-color: rgb(2, 96, 74);

}
.Inform{
  font-size: 25px;
  font-weight: bold;
}
.Inform_main{
  font-weight: bold;
  color: rgb(255, 255, 255);
  background-color:rgba(2, 96, 74, 0.188);
  border-radius: 10px;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  width: 300px;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.card img {
  max-width: 100%;
  height: auto;
}

.card button {
  margin-top: 10px;
}

</style>