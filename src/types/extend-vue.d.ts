import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $Bus: any;
    }
}

declare global {
    interface Window {
    }
}

// declare global {
//     interface CityMaker {
//         Common: any;
//     }
// }
