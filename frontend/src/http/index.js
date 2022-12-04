import Axios from "axios";
import store from "@/store";

export default {
  urls: {
    User: "/api/users/me/",
    Login: "/api/auth/sign-in/",
    Register: "/api/auth/sign-up/",
  },
  getFilterValues: function (filters) {
    if (!filters) return "";
    let filter = "";
    if (Object.keys(filters).length != 0) {
      filter = "?";
      for (const key in filters) {
        const element = filters[key];
        filter += `${key}=${element}&`;
      }
      filter = filter.slice(0, filter.lastIndexOf("&"));
    }
    return filter;
  },
  getUrl(url_name, id) {
    let url = this.urls[url_name] || url_name;
    if (id) {
      url = `${url}${id}/`;
    }
    return url;
  },
  catchError(error, options) {
    const raiseException = options?.showModal || options?.showSnackbar;
    if (raiseException) {
      options?.showModal
        ? store.commit("showErrorModal", error.response.data)
        : store.commit("showSnackbar", {
            text: error.response.data.detail || "Что-то пошло не так",
            color: "warning",
          });
    }
    return raiseException;
  },
  getHeaders() {
    return {
      Authorization: localStorage.getItem("accessToken"),
    };
  },
  getList: async function (url_name, options) {
    const filter = this.getFilterValues(options?.filters);
    try {
      return await Axios.get(`${this.getUrl(url_name)}${filter}`, {
        headers: this.getHeaders(),
      });
    } catch (error) {
      this.catchError(error, {
        showModal: options?.showModal,
        showSnackbar: options?.showSnackbar,
      });
      return error.response;
    }
  },
  getItem: async function (url_name, options) {
    try {
      return await Axios.get(this.getUrl(url_name, options?.id), {
        headers: this.getHeaders(),
      });
    } catch (error) {
      this.catchError(error, {
        showModal: options?.showModal,
        showSnackbar: options?.showSnackbar,
      });
      return error.response;
    }
  },
  createItem: async function (url_name, { data, showModal, showSnackbar }) {
    try {
      return await Axios.post(this.getUrl(url_name), data, {
        headers: this.getHeaders(),
      });
    } catch (error) {
      this.catchError(error, {
        showModal,
        showSnackbar,
      });
      return error.response;
    }
  },
  partialUpdateItem: async function (
    url_name,
    { id, data, showModal, showSnackbar }
  ) {
    try {
      return await Axios.patch(this.getUrl(url_name, id), data, {
        headers: this.getHeaders(),
      });
    } catch (error) {
      this.catchError(error, {
        showModal,
        showSnackbar,
      });
      return error.response;
    }
  },
  updateItem: async function (url_name, { id, data, showModal, showSnackbar }) {
    try {
      return await Axios.put(this.getUrl(url_name, id), data, {
        headers: this.getHeaders(),
      });
    } catch (error) {
      this.catchError(error, {
        showModal,
        showSnackbar,
      });
      return error.response;
    }
  },
  deleteItem: async function (url_name, { id, showModal, showSnackbar }) {
    try {
      return await Axios.delete(this.getUrl(url_name, id), {
        headers: this.getHeaders(),
      });
    } catch (error) {
      this.catchError(error, {
        showModal,
        showSnackbar,
      });
      return error.response;
    }
  },
};
