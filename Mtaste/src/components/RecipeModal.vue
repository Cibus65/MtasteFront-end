<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>{{ card.name }}</h2>
      <div class="accordion">
        <div class="accordion-item" @click="toggleDetails('ingredients')">
          <div class="accordion-header">
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
        <div class="accordion-item" @click="toggleDetails('description')">
          <div class="accordion-header">
            Рецепт
          </div>
          <div class="accordion-content" v-show="isDescriptionOpen">
            <div class="description">
              <div v-if="Array.isArray(card.description)">
                <div v-for="(text, index) in card.description" :key="index">
                  <strong>{{ index + 1 }}.</strong> {{ text }}
                </div>
              </div>
              <div v-else>
                <div v-text="card.description"></div>
              </div>
            </div>
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
      isDescriptionOpen: false
    };
  },
  methods: {
    toggleDetails(openedDetail) {
      if (openedDetail === 'ingredients') {
        this.isIngredientsOpen = !this.isIngredientsOpen;
        this.isDescriptionOpen = false;
      } else if (openedDetail === 'description') {
        this.isDescriptionOpen = !this.isDescriptionOpen;
        this.isIngredientsOpen = false;
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
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
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