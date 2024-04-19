<script setup name="home">
</script>

<template>
  <div class="container">
    <!-- <el-button>Default</el-button> -->
    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane label="正则匹配">
        <div class="regex-wrapper">
          <el-input size="large" v-model="regexState.regex" placeholder="请输入正则表达式" class="input-with-select" @input="handleInput">
          </el-input>

          <el-checkbox-group
            v-model="regexState.matchPattern"
          >
            <el-checkbox :key="idx" v-for="(item,idx) in regexState.matchPatternList" :label="item.label" :value="item.value"></el-checkbox>
          </el-checkbox-group>

          <div class="expression" v-if="regexExp">
            <span style="font-weight: bold;"> {{ regexExp }}</span>
          </div>
          <div class="text">
            <span :contenteditable="true">投入：</span><span style="color: red">500</span>
            <!-- <el-input
              v-model="regexState.text"
              :autosize="{ minRows: 3, maxRows: 8 }"
              type="textarea"
              placeholder="匹配文本"
            /> -->
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待定"></el-tab-pane>
      <el-tab-pane label="待定"></el-tab-pane>
      <el-tab-pane label="待定"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Home">
import { ref , reactive , computed } from 'vue';

const regexExp = computed(() => {
  if(!regexState.regex) return '';
  return `/${regexState.regex}/${regexState.matchPattern?.join('')}`
});
const regexState = reactive({
  regex: '',
  text: '',
  matchPattern: [],
  matchPatternList: [
    {
      label: '全局',
      value: 'g',
    },
    {
      label: '忽略大小写',
      value: 'i',
    },
    {
      label: '多行',
      value: 'm',
    },
    {
      label: 'Unicode',
      value: 'u',
    },
    {
      label: '粘性',
      value: 'y',
    },
  ],
})
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  .regex-wrapper{
    // display: flex;
    // justify-content: center;
    // align-items: center;
    .expression{
      margin: 10px 0;
    }
  }
}
</style>
