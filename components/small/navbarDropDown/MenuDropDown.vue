<template>
  <li
    class="drop-down-wrap"
    @mouseenter="dropDownMouseEnter()"
    @mouseleave="dropDownMouseLeave()"
  >
    <a
      href
      @click.prevent="dropDownClick()"
    >{{ name }}</a>
    <ul class="drop-down">
      <li v-for="content in contents" :key="content">
        <a href class="drop-down__item" @click.prevent>{{ content }}</a>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    contents: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isFirstHit: false
    }
  },
  methods: {
    dropDownMouseEnter() {
      this.$el.lastChild.classList.add('drop-down__active')
      this.isFirstHit = true
      setTimeout(() => {
        this.isFirstHit = false
      })
    },
    dropDownMouseLeave() {
      this.$el.lastChild.classList.remove('drop-down__active')
    },
    dropDownToggle() {
      this.$el.lastChild.classList.toggle('drop-down__active')
    },
    dropDownClick() {
      if (this.isFirstHit) {
        this.isFirstHit = false
        return
      }
      this.dropDownToggle()
    }
  }
}
</script>

<style lang="scss" scoped>
.drop-down-wrap {
 > a::after {
    content: "";
    display: inline-block;
    border-top: 4px solid;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    margin-left: 2px;
    transform: translateY(-2px);
  }
}
.drop-down {
  z-index: 5000;

  position: absolute;
  display: none;
  min-width: 200px;

  a {
    border-radius: 0 !important;
  }

  &__active {
    display: block  !important;
    .drop-down__item {
      &:hover {
        background-color: lighten(#343148, 5) !important;
      }

      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
    }
  }
}
.active-link,
.drop-down__item {
  background-color: #343148;
  color: white !important;
}
</style>
