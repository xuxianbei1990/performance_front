<template>
  <el-button :plain="true" @click="open">打开消息提示</el-button>
</template>

<script>
export default {
  methods: {
    open () {
      this.$message('这是一条消息提示')
    }
  }
}
</script>
