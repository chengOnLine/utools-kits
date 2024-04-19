<template>
    <div class="echart-container">
        <div ref="echartRef" style="width: 100%; height: 100%;"></div>
    </div>
</template>

<script setup name="echartCommon">
import * as echarts from "echarts";
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    options: {
        type: Object,
        default: () => {
            return {}
        }
    },
    handleClick: {
        type: Function,
        default: () => {
            return () => {}
        }
    }

})

const echartRef = ref(null);
const echartInstance = ref(null);

onMounted( () => {
    echartInstance.value = echarts.init(echartRef.value);
    echartInstance.value?.setOption(props.options);
    props.handleClick && typeof props.handleClick === 'function' && echartInstance.value?.on("click" , props.handleClick )
})

watch( () => props.options , (v) => {
    echartInstance.value?.setOption(props.options);
})

function getInstance(){
    return echartInstance.value;
}

defineExpose({
    getInstance
})

</script>

<style scoped lang="scss">
.echart-container{
    width: 100%;
    height: 100%;
}
</style>