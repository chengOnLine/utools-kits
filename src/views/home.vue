<script setup name="home">
</script>

<template>
  <div class="container">
    <!-- <el-button>Default</el-button> -->
    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane label="正则匹配">

        <!-- 正则表达式输入框 -->
        <div class="regex-wrapper">
          <el-input size="large" v-model="regexState.regex" placeholder="请输入正则表达式" class="input-with-select">
          </el-input>

          <el-checkbox-group v-model="regexState.matchPattern">
            <el-checkbox :key="idx" v-for="(item, idx) in regexState.matchPatternList" :label="item.label"
              :value="item.value"></el-checkbox>
          </el-checkbox-group>

          <!-- 正则表达式 -->
          <div class="expression-wrapper" v-if="regexExp">
            <span style="font-weight: bold;"> {{ regexExp }}</span>
          </div>

          <!-- 文本输入框 -->
          <div class="text-wrapper" :contenteditable="true" ref="hlTextRef" @input="regexState.handleTextInput">
          </div>

          <!-- <div v-html="matchText" ></div> -->

          <h3 style="color: #444444;margin-bottom: 10px;">共找到 {{ matchTextList?.length || 0 }} 处匹配结果</h3>
          <div class="result-wrapper">
            <div class="item" v-for="(item, idx) in matchTextList" :key="idx">{{ item }}</div>
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
import { ref , reactive , computed , onMounted , watchEffect , onUpdated , nextTick } from 'vue';

const hlTextRef = ref(null);

const regexExp = computed(() => {
  if(!regexState.regex) return '';
  return `/${regexState.regex}/${regexState.matchPattern?.join('')}`
});

const matchTextList = computed(() => {
  let regex = new RegExp(regexState.regex , regexState.matchPattern?.join(''));
  let result = regexState.text?.match(regex)
  return result;
})

const regexState = reactive({
  regex: '\\d+',
  text: '0\\n1\\n2',
  matchPattern: ['g'],
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
  hightlightTypeList: ['type-a' , 'type-b'],
  hightlightTypeIndex: 0,
  handleTextInput:(e) => {
    console.log('innder' , e.target.innerText )
    // regexState.text = e.target.innerText?.replaceAll('\n' , '<br/>');
    regexState.text = e.target.innerText;
    console.log("regexState.text" , regexState.text)


    // console.log("regexState.text" , regexState.text)
    // nextTick(() => {
    //   if( hlTextRef.value ){
    //       var range = document.createRange();
    //       range.selectNodeContents(hlTextRef.value);
    //       range.collapse(false);
    //       var sel = window.getSelection();
    //       sel.removeAllRanges();
    //       sel.addRange(range)
    //     } 
    // })
  }
})

watchEffect( () => {
  let regex = new RegExp(regexState.regex , regexState.matchPattern?.join(''));
  let text = regexState.text;
  function match(){
    console.log("arguments" , arguments)
    flag = true;
    let mText = arguments[0];
    let offset = arguments[1];
    let oText = arguments[2];
    let nodeOffset = arguments[3];
    if( hlTextRef.value?.childNodes?.length > 0 ){
      let index = regexState.hightlightTypeIndex || 0;
      const range = new Range();
      let node = hlTextRef.value.childNodes[nodeOffset];
      if( node?.nodeType != 3 && node?.nodeType != 1 ){
        return;
      }
      if( node?.nodeType === 1 ){
        node = node?.childNodes[0];
      }
      range.setStart(node , offset);
      range.setEnd(node, offset + mText?.length);
      let highlight = highlightList[index%highlightList?.length];
      highlight.add(range);
    }
    return mText;
  }

  console.log("<------------------------------------start------------------------------------------>")
  console.log("text" , text);
  console.log("hlTextRef.innerHTML" , hlTextRef.value?.innerText)
  let flag = false;
  let typeList = regexState.hightlightTypeList || [];
  regexState.hightlightTypeIndex = 0;
  let highlightList = typeList?.map( type => {
    const highlight = new Highlight();
    CSS.highlights.set(type, highlight);
    return highlight;
  })
  console.log("text" , text)
  let temp = text.replaceAll('\n\n' , '\n');
  console.log("temp" , temp)
  let lines = text?.replaceAll('\n\n', '\n')?.split(/\n/) || [];
  console.log("lines" , lines.length , lines );
  lines?.forEach( (line,idx) => {
    console.log("line" , line)
    if( line && ( regexState.matchPattern?.indexOf('g') != -1 || !flag ) ){
      line?.replace(regex , (...args) => { match(...args , idx ) } );
    }
  })
  console.log("<------------------------------------end------------------------------------------>")
})

onMounted(() => {
  if(hlTextRef.value){
    var textNode = document.createTextNode(regexState.text);
    hlTextRef.value?.appendChild(textNode);
  }
})  
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;

  .regex-wrapper {

    // display: flex;
    // justify-content: center;
    // align-items: center;
    .expression {
      margin: 10px 0;
    }
  }

  .expression-wrapper {
    color: #E87117;
    margin: 15px 0;
  }

  .text-wrapper {
    min-height: 350px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    padding: 5px;
  }

  .result-wrapper {
    display: block;
    padding: 10px;
    margin: 0 0 10.5px;
    font-size: 13px;
    line-height: 1.5;
    word-break: break-all;
    word-wrap: break-word;
    color: #333;
    background-color: whitesmoke;
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  /* 描述每种高亮方式的CSS特性 */
  ::highlight(type-a) {
    background-color: #ff0000;
    color: white;
  }

  ::highlight(type-b) {
    background-color: #ED9F1F;
    color: white;
  }
}
</style>
