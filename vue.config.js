module.exports = {
    configureWebpack: {
        externals: {
            // 'vue': "vue",
            // 'vue-router': 'vue-router',
            // 'vuex': 'Vuex',
        //     'BMap': 'BMap',
        //     'BMap_Symbol_SHAPE_POINT': 'BMap_Symbol_SHAPE_POINT',

        //     'axios': 'axios',
        //     'iView': 'iview',
        //     'echarts': 'echarts',
        },
    },
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
            cdn: {
                css: [
                    // 'https://cdn.jsdelivr.net/npm/element-ui@2.13.1/lib/theme-chalk/index.css'

                ],
                js: [
                    // "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js",
                    // "https://cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js",
                    // "https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js",

                    // "https://lib.baomitu.com/qs/6.9.1/qs.min.js",
                    // "https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js",
                    // // "https://lib.baomitu.com/element-ui/2.13.1/index.js",
                    // "https://lib.baomitu.com/iview/3.5.3/iview.min.js",
                    // "https://lib.baomitu.com/echarts/4.5.0/echarts.common.js",
                    // "https://lib.baomitu.com/echarts/4.5.0/echarts.min.js",

                ]
            },
        }
    },
};
