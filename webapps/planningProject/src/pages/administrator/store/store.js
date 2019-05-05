import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
    accountId:""
}

const getters = {
  getAccountId(state){
      return state.accountId
  }
};

const mutations = {
  changeAccountId(state, accountId) {
      state.accountId = accountId
  }
};

const store = new Vuex.Store({
  state,
  getters, 
  mutations
});

export default store