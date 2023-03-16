// data.js
import Vue from 'vue'
import definedInput from './inputCom.vue'
import definedSpan from './spanCom.vue'
// vue继承这个input组件，就相当于一个构造函数了
const InputC = Vue.extend(definedInput)
const SpanC = Vue.extend(definedSpan)
// 暴露出去，哪里需要哪里引入
export default {
  InputC,
  SpanC
}
