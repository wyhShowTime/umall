import Vue from 'vue';
import vuex from 'vuex';
import actions from './actions';
import {state,mutations,getters} from './mutations';
import cate from './modules/cate'
import spec from './modules/spec'
import goods from './modules/goods'
import banner from "./modules/banner"
Vue.use(vuex);
export default new vuex.Store({
    state,mutations,getters,actions,modules:{
        cate,spec,banner,goods
    }
})