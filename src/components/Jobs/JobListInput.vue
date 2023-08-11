<template>
  <div class="container">
    <input
      :value="modelValue"
      placeholder="Search..."
      type="search"
      class="container__input"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script setup lang="ts">
interface JobListInputProps {
  modelValue: string | null;
}

defineProps<JobListInputProps>()
defineEmits([ 'update:modelValue' ])
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex: auto;
  flex-direction: column;
  gap: px-to-rem(10);
  max-width: 100%;
  padding: 0 10px;

  &__input {
    padding: 4px 10px;
    border: 2px solid rgba(0 0 0 / 12%);
    border-radius: 5px;
    transition: $transition-fast all ease-in-out;

    &:focus {
      outline: none;
      transform: scale(1.05);
    }
  }
}
</style>
