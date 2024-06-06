<template>
  <button :class="[getTextColor, 'bg-blue-600', 'p-10']">Hello</button>
</template>
  
  <script>
export default {
  props: {
    color: {
      type: String,
      default: "white",
    },
  },
  data() {
    return {};
  },
  computed: {
    getTextColor() {
      return `text-${this.color}`;
    },
  },
};
</script>
  