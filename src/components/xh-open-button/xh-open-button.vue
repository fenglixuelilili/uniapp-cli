<template>
  <view class="waper-component">
    <button
      type="primary"
      @click="$emit('click')"
      class="waper-component-button"
    >
      <slot> </slot>
    </button>
  </view>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.waper-component-button {
  background: url('~@/static/button.png') no-repeat;
  background-size: 100% 100%;
  width: 85%;
  height: r(60);
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: r(18);
  font-weight: 600;
  color: #fff;
  border: 0 none;
  .title {
    font-size: r(18);
    font-weight: 600;
    color: #fff;
  }
}
</style>
