<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <h2>Избранное</h2>
      <div v-if="recipes.length">
        <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
          <h3>{{ recipe.title }}</h3>
          <!-- Добавьте другие поля, которые вы хотите отобразить -->
        </div>
      </div>
      <div v-else>
        <p>Нет избранных рецептов</p>
      </div>
      <button @click="$emit('close')">Закрыть</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  emits: ['close'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    userID: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.fetchFavouriteRecipes();
        }
      }
    }
  },
  methods: {
    fetchFavouriteRecipes() {
      const url = `http://localhost:8082/Mtaste/API/user/getFavouriteRecipes/:userID/${this.userID}/`;
      axios.get(url)
        .then(response => {
          this.recipes = response.data;
        })
        .catch(error => {
          console.error('Ошибка при получении избранных рецептов:', error);
        });
    }
  }
};





</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>