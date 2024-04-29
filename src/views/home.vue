<script setup name="home">
</script>

<template>
  <div class="container">
    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane label="正则匹配">

        <div class="regex-list-wrapper">
          <a @click="(e) => regexState?.handleExpClick(e, regex)" href="#" class="regex-exp"
            v-for="(regex, idx) in regexState.regexExpList" :key="idx">{{ regex.label }}</a>
        </div>

        <!-- 正则表达式输入框 -->
        <div class="regex-wrapper">
          <div class="regex-content" autocorrect="off" autocapitalize="off" spellcheck="false" translate="no"
            placeholder="请输入内容" :aria-multiline="true" :contenteditable="true" ref="hlRegexRef"
            @input="regexState.handleRegexInput">
          </div>
        </div>

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
          <div class="text-content" autocorrect="off" autocapitalize="off" spellcheck="false" translate="no"
            placeholder="请输入内容" :aria-multiline="true" :contenteditable="true" ref="hlTextRef"
            @input="regexState.handleTextInput">
          </div>
        </div>

        <h3 style="color: #444444;margin-bottom: 10px;">共找到 {{ matchTextList?.length || 0 }} 处匹配结果</h3>
        <div class="result-wrapper">
          <div class="item" v-for="(item, idx) in matchTextList" :key="idx">{{ item }}</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Home">
import { ref , reactive , computed , onMounted , watchEffect , onUpdated , nextTick } from 'vue';

const hlTextRef = ref(null);
const hlRegexRef = ref(null);

const regexExp = computed(() => {
  if(!regexState.regex) return '';
  return `/${regexState.regex}/${regexState.matchPattern?.join('')}`
});

const matchTextList = computed(() => {
  console.log("text" , regexState.text , 'regex' , regexState.regex )
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
  // text:  `13565770467 620201200603267353`,
  text: `13565770467
  620201200603267353
  8e2a@hzwk937.site
  17:45:35
  10.255.33.30
  粤B5XF44`,
  placeholder: '',
  regexHtml: '',
  nodeList: [],
  regexNodeList: [],
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
      // value: '(13\\d|14[579]|15[^4\\D]|17[^49\\D]|18\\d)\\d{8}'
      value: '^(?:(?:\\+|00)86)?1[3-9]\\d{9}$',
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
    regexState.text = e.target.innerText;
    let childNodes = hlTextRef.value.childNodes || [];
    regexState.nodeList = [ ...childNodes ];
    
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
  },
  handleRegexInput: (e) => {
    regexState.regex = e.target.innerText;
    let childNodes = hlRegexRef.value?.childNodes || [];
    regexState.regexNodeList = [...childNodes];
  },
  handleExpClick: (e , item ) => {
    e?.preventDefault();
    regexState.regex = item.value;
    hlRegexRef.value.innerText = regexState.regex;
    let childNodes = hlRegexRef.value?.childNodes || [];
    regexState.regexNodeList = [...childNodes];
  }
})

watchEffect( () => {
  let childNodes = regexState.nodeList || [];
  let regexNodes = regexState.regexNodeList || [];
  regexState.hightlightTypeIndex = 0;
  let highlightList = regexState.hightlightTypeList?.map( type => {
    const highlight = new Highlight();
    CSS.highlights.set(type, highlight);
    return highlight;
  })

  let regexLines = [];
  Array.from(regexNodes)?.map( node => {
    const { nodeType } = node;
    if( nodeType === 1 && node.childNodes?.length > 0 ){
      regexLines.push(node.childNodes[0]?.nodeValue);
    }else{
      regexLines.push(node?.nodeValue)
    }
  })

  let lines = [];
  Array.from(childNodes)?.map( node => {
    const { nodeType } = node;
    if( nodeType === 1 && node.childNodes?.length > 0 ){
      lines.push(node.childNodes[0]?.nodeValue);
    }else{
      lines.push(node?.nodeValue)
    }
  })

  if( lines?.length < regexLines?.length ) return;
  let regex;
  let flag = false;
  if( regexLines?.length <= 1 ){
      try{
        regex = new RegExp( regexLines[0] , regexState.matchPattern?.join('')); 
      }catch(e){}
      console.log("regex1" , regex);
      if( !regex ) return;
      console.log("regex2" , regex);
      console.log('lines' , lines);
      lines?.forEach( (line,idx) => {
        console.log("line" , line)
        // 如果不是全局g只匹配一次
        if( line && ( regexState.matchPattern?.indexOf('g') != -1 || !flag ) ){
          line?.replace(regex , (...args) => { console.log("asd"); match(...args , idx ) } );
        }
      })
  }else{
    console.log("start" , lines)
      for( let i = 0; i < lines.length ; i++ ){
        let j = 0;
        let isMatch = true;
        let matchList = [];
        while( j < regexLines.length && i < lines.length ){
          let line = lines[i];
          console.log("i" , i , line)
          console.log("j" , j ,  regexLines[j] )
          if(( regexLines[j] == null || regexLines[j] == '' ) && (line == null || line == '' )){
            matchList?.push({ mText: '' , offset: 0 , oText: '' , nodeOffset: i });
            i++;
            j++;
            continue;
          }   

          if(j === 0){
            try{
              regex = new RegExp( regexLines[j] , regexState.matchPattern?.join('')); 
            }catch(e){}
            if( !regex ) return;
            var temp = regex?.exec(line);
            let match;
            if(temp) match = temp;
            console.log("matchText1" , match , match?.index)
            while( temp != null ){
              temp = regex.exec(line);
              if(temp) match = temp;
              console.log("matchText1" , match)
            }
            if(!match || !line?.endsWith(match[0])){
              isMatch = false;
              i++;
              j++;
              break;
            }else{
              matchList?.push({ mText: match[0] , offset: match?.index , oText: match?.input , nodeOffset: i });
              i++;
              j++;
            }
          }else if( j === regexLines.length - 1 ){
            try{
              regex = new RegExp( regexLines[j] , regexState.matchPattern?.join('')); 
            }catch(e){}
            if( !regex ) return;
            var match = regex.exec(line);
            console.log("matchText3" , match)
            if(!match || !line?.startsWith(match[0])){
              isMatch = false;
              i++;
              j++;
              break;
            }else{
              matchList?.push({ mText: match[0] , offset: match?.index , oText: match?.input , nodeOffset: i });
              i++;
              j++;
            }
          }else {
            try{
              regex = new RegExp( regexLines[j] , regexState.matchPattern?.join('')); 
            }catch(e){}
            if( !regex ) return;
            var match = regex.exec(line);
            console.log("matchText2" , match)
            if( !match || line != match[0] ){
              isMatch = false;
              i++;
              j++;
              break;
            }else{
              matchList?.push({ mText: match[0] , offset: match?.index , oText: match?.input , nodeOffset: i });
              i++;
              j++;
            }
          }
        }
        console.log("isMatch" , isMatch )
        if( isMatch && j === regexLines?.length){
          console.log("matchList" , matchList)
          matchList?.forEach( match => {
            const { mText , offset , nodeOffset } = match;
            let index = regexState.hightlightTypeIndex || 0;
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
          })
          regexState.hightlightTypeIndex += 1;
          if( regexState.matchPattern?.indexOf('g') === -1 ){
            break;
          }
          i = i - 1;
        }else{
          i = i - j;
        }
      }
      console.log("end")
  }

    // lines?.forEach( (line,idx) => {
    //   // 如果不是全局g只匹配一次
    //   if( line && ( regexState.matchPattern?.indexOf('g') != -1 || !flag ) ){
    //     line?.replace(regex , (...args) => { match(...args , idx ) } );
    //   }
    // })

    function match(){
      console.log("arguments" , arguments)
      flag = true;
      regexState.hightlightTypeIndex += 1;
      let mText = arguments[0];
      let offset = arguments[arguments.length-3];
      let oText = arguments[arguments.length-2];
      let nodeOffset = arguments[arguments.length-1];
      // 匹配文本高亮显示
      if( childNodes?.length > 0 ){
        let index = regexState.hightlightTypeIndex || 0;
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
  // console.log("<------------------------------------end------------------------------------------>")
})

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

onMounted(() => {
  bindPasteEvent();
  if(hlTextRef.value){
    var lineDivNode = document.createElement('div');
    lineDivNode.classList?.add('text-line');
    var textNode = document.createTextNode(regexState.text);
    lineDivNode?.appendChild(textNode);
    if( regexState.text != '' && regexState.text != null ) {
      hlTextRef.value?.appendChild(lineDivNode);
      regexState.nodeList = hlTextRef.value?.childNodes || [];
    }
  }
  if( hlRegexRef.value ){
    var lineDivNode = document.createElement('div');
    lineDivNode.classList?.add('regex-line');
    var textNode = document.createTextNode(regexState.regex);
    lineDivNode?.appendChild(textNode);
    if( regexState.regex  != '' && regexState.regex != null ){
      hlRegexRef.value?.appendChild(lineDivNode);
      regexState.regexNodeList = hlRegexRef.value?.childNodes || [];
    }
  }
})  
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;

  [contenteditable]:focus {
    outline: none;
  }

  .regex-list-wrapper {
    margin-bottom: 15px;

    .regex-exp {
      color: #409eff;
      margin-right: 10px;
      text-decoration: none;
    }

    .regex-exp:hover {
      text-decoration: underline;
    }
  }

  .regex-wrapper {
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    padding: 5px;
    overflow: auto;

    .regex-content {
      min-height: 100%;
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

    .text-content {
      min-height: 100%;

      :deep(.text-line) {}

      :deep(.text-placeholder) {
        pointer-events: none;
        color: #333;
        opacity: 0.5;
      }

      :deep(.text-enter)::before {
        content: '↵';
        color: #ccc;
        -webkit-user-modify: read-only;
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
