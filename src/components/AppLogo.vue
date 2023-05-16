<template>
  <img
    v-if="avatar"
    :class="avatarClass"
    :src="avatar"
    alt="Avatar"
  >
</template>

<script lang="ts" setup>
interface AppProfileAvatarProps {
  avatar?: string;
  firstName?: string;
  lastName?: string;
  sizeType?: 'normal' | 'big'
}

const props = withDefaults(defineProps<AppProfileAvatarProps>(), {
  sizeType: 'normal'
})

const avatarClass = `avatar avatar--${ props.sizeType }`

</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  // font: #{px-to-rem(16)}/#{px-to-rem(24)} #{var(--font-family)};
  // color: var(--color-text-reverse-secondary);
  // background-color: var(--color-accent-secondary);
  border-radius: 50%;
  object-fit: cover;


  &--normal {
    width: px-to-rem(40);
    height: px-to-rem(40);
  }

  &--big {
    width: px-to-rem(65);
    height: px-to-rem(65);
  }
}
</style>
