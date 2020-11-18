import { reqCatelist } from '@/utils/http'
const state = {
    list: []
};
const mutations = {
    changeList(state, arr) {
        state.list = arr
    }
};
const getters = {
    list(state) {
        return state.list
    }
};
const actions = {
    reqList(context) {
        reqCatelist({ istree: true }).then(res => {
            context.commit('changeList', res.data.list)
        })
    }
};
export default {
    state, mutations, getters, actions,
    namespaced: true
}