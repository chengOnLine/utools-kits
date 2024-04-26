<script setup name="home">
</script>

<template>
  <div class="container">
    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane label="正则匹配">

        <div class="regex-list-wrapper">
          <a @click="(e) => handleExpClick( e , regex)" href="#" class="regex-exp" v-for="(regex,idx) in regexState.regexExpList" :key="idx">{{ regex.label }}</a>
        </div>

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
          <div class="text-wrapper">
            <div class="text-content" autocorrect="off" autocapitalize="off" spellcheck="false" translate="no" placeholder="请输入内容"
              :aria-multiline="true" :contenteditable="true" ref="hlTextRef" @input="regexState.handleTextInput">
            </div>
          </div>

          <!-- <div v-html="matchText" ></div> -->

          <h3 style="color: #444444;margin-bottom: 10px;">共找到 {{ matchTextList?.length || 0 }} 处匹配结果</h3>
          <div class="result-wrapper">
            <div class="item" v-for="(item, idx) in matchTextList" :key="idx">{{ item }}</div>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="待定"></el-tab-pane>
      <el-tab-pane label="待定"></el-tab-pane>
      <el-tab-pane label="待定"></el-tab-pane> -->
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
  regex: '',
  text: `
  13565770467
  620201200603267353
  8e2a@hzwk937.site
  17:45:35
  10.255.33.30
  粤B5XF44`,
  placeholder: '',
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

  regexExpList:[
    {
      label: '正整数',
      value: '[1-9]\\d*',
    },
    {
      label: '邮箱',
      value: '\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}',
    },
    {
      label: '手机号',
      value: '(13\\d|14[579]|15[^4\\D]|17[^49\\D]|18\\d)\\d{8}'
    },{
      label: '身份证',
      value: '\\d{17}[0-9Xx]|\\d{15}',
    },
    {
      label: 'IP',
      value: '\\d{0,3}\\.\\d{0,3}\\.\\d{0,3}\\.\\d{0,3}',
    },
    {
      label: '车牌号',
      value: '(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))'
    },
    {
      label: '时间(时:分:秒)',
      value: '([01]?\\d|2[0-3]):[0-5]?\\d:[0-5]?\\d',
    }
  ],
  handleTextInput:(e) => {
    // console.log('innder' , e )
    // regexState.text = e.target.innerText?.replaceAll('\n' , '<br/>');
    regexState.text = e.target.innerText;
    let childNodes = hlTextRef.value.childNodes || [];
    regexState.nodeList = [ ...childNodes ];
    
    // var lineNodes = hlTextRef.value?.querySelectorAll('.text-line');
    // console.log('lineNodes' , lineNodes);
    // Array.from(lineNodes)?.forEach( (lineNode,idx) => {
    //   if( idx !== lineNodes?.length -1 ){
    //     var enterNode = lineNode.querySelector('.enter-symbol');
    //     if( !enterNode ){
    //       var spanNode = document.createElement('span');
    //       spanNode.setAttribute("contenteditable" , "false");
    //       spanNode.className = 'enter-symbol';
    //       spanNode.style.color = 'rgba(0,0,0,.25)';
    //       spanNode.style.pointerEvents = 'none';
    //       var textNode = document.createTextNode('↵');
    //       spanNode?.appendChild(textNode);
    //       lineNode?.insertBefore(spanNode , lineNode.children[0]);
    //     } 
    //   }
    // })
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
  let regex;
  let childNodes = regexState.nodeList || [];
  try{
    regex = new RegExp(regexState.regex , regexState.matchPattern?.join('')); 
  }catch(e){}


  function match(){
    // console.log("arguments" , arguments)
    flag = true;
    let mText = arguments[0];
    let offset = arguments[arguments.length-3];
    let oText = arguments[arguments.length-2];
    let nodeOffset = arguments[arguments.length-1];
    // 匹配文本高亮显示
    if( childNodes?.length > 0 ){
      let index = regexState.hightlightTypeIndex || 0;
      regexState.hightlightTypeIndex += 1;
      const range = new Range();
      let node = childNodes[nodeOffset];
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

  // console.log("<------------------------------------start------------------------------------------>")
  let flag = false;
  regexState.hightlightTypeIndex = 0;
  let highlightList = regexState.hightlightTypeList?.map( type => {
    const highlight = new Highlight();
    CSS.highlights.set(type, highlight);
    return highlight;
  })
  // 分行匹配
  let lines = [];
  Array.from(childNodes)?.map( node => {
    const { nodeType } = node;
    if( nodeType === 1 && node.childNodes?.length > 0 ){
      lines.push(node.childNodes[0]?.nodeValue);
    }else{
      lines.push(node?.nodeValue)
    }
  })
  console.log("lines" , lines.length , lines );
  lines?.forEach( (line,idx) => {
    // 如果不是全局g只匹配一次
    if( line && ( regexState.matchPattern?.indexOf('g') != -1 || !flag ) ){
      line?.replace(regex , (...args) => { match(...args , idx ) } );
    }
  })
  // console.log("<------------------------------------end------------------------------------------>")
})

// watchEffect( () => {
//   console.log("watchEffect")
//   let childNodes = regexState.nodeList || [];
  
//   if( !childNodes || childNodes?.length === 0 ){
//     var lineDiv = document.createElement('div');
//     var br = document.createElement('br');
//     lineDiv.appendChild(br);
//     lineDiv.className = 'text-line';
//     hlTextRef.value?.appendChild(lineDiv);
//   }else{
//     childNodes?.forEach( (node , idx) => {
//       const { nodeType } = node;
//       if( idx != childNodes?.length - 1 && nodeType === 1 ){
//         let hasEnterNode = node?.querySelector('.text-enter');
//         let hasBrNode = node?.querySelector('br');

//         var brNode = document.createElement('br');
//         var enterNode = document.createElement('span');
//         var textNode = document.createTextNode('');
//         enterNode?.appendChild(textNode);
//         enterNode.className = 'text-enter';
//         enterNode.setAttribute('contenteditable' , false);
//         enterNode.style.color = '#333';
//         enterNode.style.opacicy = 0.5;
//         if( hasBrNode && !hasEnterNode ){
//           node?.insertBefore( enterNode , hasBrNode);
//         }else if( !hasBrNode && !hasEnterNode ){
//           node?.appendChild( enterNode );
//           // node?.appendChild( brNode );
//         }
//       }
//     })
//   }

//   nextTick(() => {
//     let childNodes = hlTextRef.value.childNodes || [];
//     console.log("childNodes" , childNodes.length)
//     childNodes?.forEach( (node , idx) => {
//       const { nodeType } = node;
//       console.log("nodeType" , nodeType );
//       console.log("node",node)
//     })
//   })
// })

// function createPlaceholderSpanNode(){
//     var placeholderSpanNode = document.createElement('span');
//     var placeholderTextNode = document.createTextNode(regexState.placeholder);
//     placeholderSpanNode.classList?.add('text-placeholder');
//     placeholderSpanNode.setAttribute("contenteditable" , "false");
//     placeholderSpanNode.setAttribute('data-widger' , 'false');
//     placeholderSpanNode.style.pointerEvents = 'none';
//     placeholderSpanNode.appendChild(placeholderTextNode);
//     return placeholderSpanNode;
// }

function bindPasteEvent(){
  // 监听粘贴事件,过滤富文本
  hlTextRef.value?.addEventListener('paste', function(event) {
    event.preventDefault();
    var clipboardData = event.clipboardData || window.clipboardData;
    var pastedText = clipboardData.getData('text');
    // console.log(pastedText);
    if (document.body.createTextRange) {    
        if (document.selection) {
            textRange = document.selection.createRange();
        } else if (window.getSelection) {
            sel = window.getSelection();
            var range = sel.getRangeAt(0);
            
            // 创建临时元素，使得TextRange可以移动到正确的位置
            var tempEl = document.createElement("span");
            tempEl.innerHTML = "&#FEFF;";
            range.deleteContents();
            range.insertNode(tempEl);
            textRange = document.body.createTextRange();
            textRange.moveToElementText(tempEl);
            tempEl.parentNode.removeChild(tempEl);
        }
        textRange.text = pastedText;
        textRange.collapse(false);
        textRange.select();
    } else {
        // Chrome之类浏览器
        document.execCommand("insertText", false, pastedText);
    }
  });
}

function handleExpClick(e , item) {
  e?.preventDefault();
  regexState.regex = item.value;
}

onMounted(() => {
  bindPasteEvent();
  if(hlTextRef.value){
    var lineDivNode = document.createElement('div');
    lineDivNode.classList?.add('text-line');
    var textNode = document.createTextNode(regexState.text);
    lineDivNode?.appendChild(textNode);
    hlTextRef.value?.appendChild(lineDivNode);
    regexState.nodeList = hlTextRef.value?.childNodes || [];
  }

})  
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;

  [contenteditable]:focus {
    outline: none;
  }

  .regex-list-wrapper{
    margin-bottom: 15px;
    .regex-exp{
      color: #409eff;
      margin-right: 10px;
      text-decoration: none;
    }
    .regex-exp:hover{
      text-decoration: underline;
    }
  }

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
    height: 250px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    padding: 5px;
    overflow: auto;

    .text-content{
      min-height: 100%;
      :deep(.text-line){
      }
      :deep(.text-placeholder){
        pointer-events:none;
        color: #333;
        opacity: 0.5;
      }
      :deep(.text-enter)::before{
        content: '↵';
        color: #ccc;
      }
    }
    // .text-content[contenteditable]:empty::before {
    //     content: attr(placeholder);
    //     color: #ccc;
    // }

    // .text-content[contenteditable]:focus {
    //     content: none;
    //     outline: none;
    //     border: 1px solid #2662c4;
    // }
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
