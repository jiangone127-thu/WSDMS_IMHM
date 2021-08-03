<template>
    <div class="layoutMain">
        <gisMain> </gisMain>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import gisMain from "@/components/common/GisMain.vue";

    @Component({
        name: 'LayoutMain',
        components: {gisMain},
    })
    export default class LayoutMain extends Vue {
        private mounted() {
        }
    }
</script>
<style lang="less" scoped>
    .layoutMain {
        outline: 1px solid red;
        height: 100%;
        width: 100%;
        position: relative;
    }
    .map-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

</style>
