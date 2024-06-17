<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>{{ card.name }}</h2>
      <div class="ingredients">
        <div v-for="(amount, ingredient) in card.ingredients" :key="ingredient">
          <label>
            <input type="checkbox" :value="ingredient" v-model="selectedIngredients">
            <strong :class="{ 'strikethrough': selectedIngredients.includes(ingredient) }">{{ ingredient }}</strong>:
            <span :class="{ 'strikethrough': selectedIngredients.includes(ingredient) }">{{ amount }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    card: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedIngredients: this.loadSelectedIngredients()
    };
  },
  methods: {
    loadSelectedIngredients() {
      const storedIngredients = localStorage.getItem('selectedIngredients');
      return storedIngredients ? JSON.parse(storedIngredients) : [];
    },
    saveSelectedIngredients() {
      localStorage.setItem('selectedIngredients', JSON.stringify(this.selectedIngredients));
    }
  },
  watch: {
    selectedIngredients: {
      handler(newValue) {
        this.saveSelectedIngredients();
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.saveSelectedIngredients();
  }
};
</script>

<style scoped>

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4); /* Чуть прозрачнее, чтобы контент под ним был видимым */
}

.modal-content {
  background-color: #ffffff;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 900px;
  box-sizing: border-box;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}

h2 {
  margin-top: 0;
  color: #333;
  margin-bottom: 20px;

}

p {
  color: #666;
}
@media screen and (max-width: 600px) {
  .modal-content {
    width: 90%;
  }
}
@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
    transition: opacity 1.5s;
  }
}
details {
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

summary {
  padding: 10px;
  cursor: pointer;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
}

.ingredients{
  padding: 10px;

}

label {
  font-size: 1.75em; /* Увеличиваем размер текста */
  display: flex; /* Используем flexbox для выравнивания элементов */
  align-items: center; /* Выравниваем по вертикали */
}
@media (max-width:540px){
  label {
  font-size: 1.2rem; 
  padding: 5px;
  display: flex; 
  align-items: center; 
}
}
@media (max-width:430px){
  label {
  font-size: 1.1rem; 
  padding: 5px;
  display: flex; 
  align-items: center; 
}
}
@media (max-width:414px){
  label {
  font-size: 1rem; 
  padding: 5px;
  display: flex; 
  align-items: center; 
}
}
@media (max-width:375px){
  label {
  font-size: 1rem; 
  padding: 5px;
  display: flex; 
  align-items: center; 
}
}


.strikethrough {
  text-decoration: line-through;
}

input[type="checkbox"] {
  margin-right: 10px; /* Добавляем отступ справа от галочки */
  -webkit-appearance: none; /* Убираем дефолтный стиль для checkbox */
  appearance: none;
  background-color: #fff; /* Цвет фона */
  border: 1px solid #ccc; /* Рамка */
  border-radius: 50%; /* Делаем круглым */
  width: 24px; /* Размер */
  height: 24px; /* Размер */
  display: inline-block; /* Чтобы галочка была на той же строке с текстом */
  vertical-align: middle; /* Выравниваем по вертикали */
}

input[type="checkbox"]:checked {
  background-color: #02604a; /* Цвет фона при активной галочке */
}

</style>