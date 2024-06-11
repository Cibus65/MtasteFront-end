<template>
  <div id="carouselExampleCaptions" class="carousel slide random_carusel" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        v-for="(recipe, index) in recipes"
        :key="index"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        :data-bs-slide-to="index"
        :class="{ active: index === activeSlide }"
        :aria-current="index === activeSlide"
        :aria-label="'Slide ' + (index + 1)"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(recipe, index) in recipes"
        :key="index"
        class="carousel-item"
        :class="{ active: index === activeSlide }"
      >
        <img :src="recipe.imgwindowurl" class="d-block w-100 carusel_img" :alt="recipe.name">
        <div class="carousel-caption d-none d-md-block">
              <h5>{{ recipe.name }}</h5>
              <button class="btn btn-outline-secondary cook-btn" @click="openRecipeModal(card)">Готовить</button>
          </div>
      </div>
      
          
    
      <div v-if="showRecipeModal" class="modal"></div>
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
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      activeSlide: 0,
      recipes: [],
      selectedRecipe: null,
      showRecipeModal: false,
    }
  },
  methods: {
      
    async fetchRecipes() {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8082';

        const response = await axios.get(`${baseURL}/Mtaste/API/getRandomRecipe`);
        this.recipes = response.data;
      } catch (error) {
        console.error('Ошибка при получении рецептов:', error);
      }
    }
  },
  
  openRecipeModal(recipe) {
    const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8082';

    axios.get(`${baseURL}/Mtaste/API/getRecipeByID/${recipe.id}`)
      .then(response => {
        this.selectedRecipe = response.data;
        this.showRecipeModal = true;
      })
      .catch(error => {
        console.error('Ошибка при загрузке описания рецепта:', error);
      });
  },
  closeRecipeModal() {
    this.showRecipeModal = false;
  },
  created() {
    this.fetchRecipes();
  }
}
</script>

<style scoped>

.carousel-inner{
  box-shadow: 5px 5px 5px 1.5px rgb(206, 206, 206);
  border: 1px solid;
  border-radius: 15px;
}
.carusel_img{
  max-height: 500px;
  max-width: 1000px;
}
.cook-btn{
  text-align: center;
  margin-top: 15px;
  margin-left: 5px;
  margin-bottom: 15px;
  width: 150px;
  height: 40px;
}

.btn {
color: white;
background-color: rgba(2, 96, 74, 0.8);
border-color: rgba(2, 96, 74, 0.8);
font-family: "Gilda Display", serif;
}

.btn:hover{
background-color: rgb(1, 76, 59);
}

</style>