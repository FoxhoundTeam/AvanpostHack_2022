import Vuex from "vuex";
import http from "../http";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showErrorModal: false,
    errorModalContent: null,
    snackbarColor: null,
    showSnackbar: false,
    snackbarText: null,
  },
  getters: {},
  mutations: {
    showErrorModal(state, content) {
      state.errorModalContent = content;
      state.showErrorModal = true;
    },
    setShowErrorModal(state, value) {
      state.showErrorModal = value;
    },
    showSnackbar(state, content) {
      state.snackbarColor = content.color || "success";
      state.snackbarText = content.text;
      state.showSnackbar = true;
    },
    setShowSnackbar(state, value) {
      state.showSnackbar = value;
    },
  },
  actions: {},
});
