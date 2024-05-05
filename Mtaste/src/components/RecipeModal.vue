<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>{{ card.name }}</h2>
      <div class="accordion">
        <div class="accordion-item">
          <div class="accordion-header" @click="toggleDetails('ingredients')">
            Ингредиенты
          </div>
          <div class="accordion-content" v-show="isIngredientsOpen">
            <div class="ingredients">
              <div v-for="(amount, ingredient) in card.ingredients" :key="ingredient">
                <strong>{{ ingredient }}:</strong> {{ amount }}
              </div>
            </div>
          </div>
        </div>
        <div v-for="(step, index) in card.description" :key="index" class="accordion-item">
          <div class="accordion-header" @click="toggleDetails('description', index)">
            Шаг {{ index }}
          </div>
          <div class="accordion-content" v-show="openedDescriptionIndex === index">
            <div class="description" v-text="step"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    card: Object
  },
  data() {
    return {
      isIngredientsOpen: false,
      openedDescriptionIndex: null
    };
  },
  methods: {
    toggleDetails(detailType, index) {
      if (detailType === 'ingredients') {
        this.isIngredientsOpen = !this.isIngredientsOpen;
        // Закрываем открытый шаг, если он был открыт
        if (this.openedDescriptionIndex !== null) {
          this.openedDescriptionIndex = null;
        }
      } else if (detailType === 'description') {
        this.openedDescriptionIndex = this.openedDescriptionIndex === index ? null : index;
        // Закрываем открытые ингредиенты, если они были открыты
        if (this.isIngredientsOpen) {
          this.isIngredientsOpen = false;
        }
      }
    }
  }
};
</script>

<style scoped>
.accordion {
  border: 1px solid #ddd;
  border-radius: 4px;
}

.accordion-item {
  margin-bottom: 10px;
}

.accordion-header {
  padding: 10px;
  cursor: pointer;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.accordion-content {
  padding: 10px;
}
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
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 800px;
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
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.ingredients,
.description {
  padding: 10px;
}
</style>