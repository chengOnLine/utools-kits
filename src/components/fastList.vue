<template>
    <div class="fast-list-container">
    <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
        <slot name="header" :total="state.page?.total"></slot>
        <van-list
            v-model:loading="state.loading"
            :finished="state.finished"
            finished-text=""
            loading-text=" "
            @load="onLoad"
        >
            <van-empty
                v-if="state.list.length == 0"
                image-size="180"
                description="暂无数据..."
            />
            <slot :list="state.list"></slot>
        </van-list>
    </van-pull-refresh>
    </div>
</template>

<script setup name="FastList">
import { reactive } from 'vue';

const props = defineProps({
    request: {
        type: Function,
        default: undefined,
    },
    handleParams: {
        type: Function,
        default: params => params
    },
    handleResult: {
        type: Function,
        default: result => result
    },
})

const state = reactive({
    refreshing: false,
    loading: false,
    finished: false,
    list: [],  
    page: {
        pageNumber: 1,
        pageSize: 10,
        total: 0,
    }
})

function onLoad(){
    getData();
}

function onRefresh(){
    state.refreshing = true;
    state.loading = false;
    state.finished = false;
    state.page.pageNumber = 1;
    state.list = [];
    getData();
}

function getData(){
    if( !props.request || typeof props.request !== 'function' || state.finished ) return;
    const params = props?.handleParams({ pageNumber: state.page?.pageNumber , pageSize: state.page?.pageSize });
    console.log('params',params)
    state.loading = true;
    typeof props.request === 'function' && props.request(params).then( res => {
        const { flag , data } = res;
        if( flag && data ){
            if( Array.isArray(data) ){
                const list = props?.handleResult(data);
                state.list = state.list?.concat(list);
                state.finished = true;
            }else{
                const { rows = [] , total } = data;
                const list = props?.handleResult(rows);
                state.list = state.list?.concat(list);
                state.page.pageNumber++;
                state.page.total = total;
                if( !total || state.list.length >= total ){
                    state.finished = true;
                }
            }
        }else{
            state.list = props?.handleResult([])
            state.finished = true; 
        }
    }).catch( () => {
        state.list = props?.handleResult([])
        state.finished = true; 
    }).finally( () => {
        state.loading = false;
        state.refreshing = false;
    })
}

function refreshList(){
    state.refreshing = false;
    state.loading = false;
    state.finished = false;
    state.page.pageNumber = 1;
    state.list = [];
    getData();
}

defineExpose({
    refreshList
})

</script>

<style scoped lang="scss">
// .fast-list-container{
    
// }
</style>