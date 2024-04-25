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
          <div 
            class="text-wrapper" 
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            translate="no"
            :aria-multiline="true"
            :contenteditable="true" 
            ref="hlTextRef" 
            @input="regexState.handleTextInput"
          >
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
  if( regexState.matchPattern?.indexOf('g') == -1 && result?.length > 0 ){
    result = [result[0]] 
  }
  console.log('result' ,result)
  return result;
})

const regexState = reactive({
  regex: '\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}',
  text: `下面是一些测试实例:
          demo@qq.com
          tool-lu@vip.qq.com
          tool+lu@gmail.com
          demo@live.com
          1019034271@qq.com
          127.0.0.1
          http://tool.lu/
          https://tool.lu/
          123456789012345
          16:09:22`,
  placeholder: '请输入文本',
  html: '',
  nodeList: [],
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
    console.log('innder' , e )
    // regexState.text = e.target.innerText?.replaceAll('\n' , '<br/>');
    regexState.text = e.target.innerText;
    let childNodes = hlTextRef.value.childNodes || [];
    regexState.nodeList = [ ...childNodes ];
    
    var lineNodes = document.querySelectorAll('.text-line');
    console.log('lineNodes' , lineNodes);

    Array.from(lineNodes)?.forEach( (lineNode,idx) => {
      if( idx !== lineNodes?.length -1 ){
        var enterNode = lineNode.querySelector('.enter-symbol');
        if( !enterNode ){
          var spanNode = document.createElement('span');
          spanNode.setAttribute("contenteditable" , "false");
          spanNode.setAttribute("class" , "enter-symbol");
          spanNode.style.color = 'rgba(0,0,0,.25)';
          spanNode.style.pointerEvents = 'none';
          var textNode = document.createTextNode('↵');
          spanNode?.appendChild(textNode);
          lineNode?.insertBefore(spanNode , lineNode.children[0]);
        } 
      }
    })
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
  // console.log("watchEffect")
  let regex;
  function match(){
    // console.log("arguments" , arguments)
    flag = true;
    let mText = arguments[0];
    let offset = arguments[arguments.length-3];
    let oText = arguments[arguments.length-2];
    let nodeOffset = arguments[arguments.length-1];
    if( hlTextRef.value?.childNodes?.length > 0 ){
      let index = regexState.hightlightTypeIndex || 0;
      regexState.hightlightTypeIndex += 1;
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
  try{
    regex = new RegExp(regexState.regex , regexState.matchPattern?.join('')); 
  }catch(e){

  }

  // console.log("<------------------------------------start------------------------------------------>")
  let flag = false;
  let typeList = regexState.hightlightTypeList || [];
  regexState.hightlightTypeIndex = 0;
  let highlightList = typeList?.map( type => {
    const highlight = new Highlight();
    CSS.highlights.set(type, highlight);
    return highlight;
  })
  // let lines = text?.replaceAll('\n\n', '\n')?.split(/\n/) || [];
  if( hlTextRef.value ){
    // let childNodes = hlTextRef.value.childNodes;
    let childNodes = regexState.nodeList || [];
    // console.log("childnOde" , childNodes.length)
    let lines = [];
    Array.from(childNodes)?.map( node => {
      // console.log( 'node' ,node , node.nodeType , node.nodeValue)
      const { nodeType } = node;
      if( nodeType === 1 && node.childNodes?.length > 0 ){
        lines.push(node.childNodes[0]?.nodeValue);
      }else{
        lines.push(node?.nodeValue)
      }
    })
    // console.log("lines" , lines.length , lines );
    lines?.forEach( (line,idx) => {
      if( line && ( regexState.matchPattern?.indexOf('g') != -1 || !flag ) ){
        line?.replace(regex , (...args) => { match(...args , idx ) } );
      }
    })
  }
  // console.log("<------------------------------------end------------------------------------------>")
})

function createPlaceholderNode(){
    var lineDivNode = document.createElement('div');
    var placeholderSpanNode = document.createElement('span');
    var placeholderTextNode = document.createTextNode(regexState.placeholder);
    lineDivNode.setAttribute('class' , 'text-line');
    placeholderSpanNode.setAttribute("contenteditable" , "false");
    placeholderSpanNode.style.pointerEvents = 'none';
    placeholderSpanNode.appendChild(placeholderTextNode);
    lineDivNode.appendChild(placeholderSpanNode);
    hlTextRef.value?.appendChild(lineDivNode);
}

onMounted(() => {
  if(hlTextRef.value){
    var lineDivNode = document.createElement('div');
    var textNode = document.createTextNode(regexState.text);
    lineDivNode.setAttribute('class' , 'text-line');
    lineDivNode?.appendChild(textNode);
    hlTextRef.value?.appendChild(lineDivNode);
    regexState.nodeList = hlTextRef.value?.childNodes || [];
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
    min-height: 100px;
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
    background-color: #f3db90;
    color: #382c06;
  }

  /* 描述每种高亮方式的CSS特性 */
  ::highlight(type-b) {
    background-color: #99beff;
    color: #382c06;
  }
}
</style>
