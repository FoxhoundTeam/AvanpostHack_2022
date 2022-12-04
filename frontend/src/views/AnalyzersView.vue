<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          label="Выберите действие"
          :items="analyzers"
          v-model="activeAnalyzer"
        />
        <v-form v-if="activeAnalyzer == '/api/recognize/'">
          <v-file-input label="Файл отпечатка пальца" v-model="firstImage" />
        </v-form>
        <v-form v-else>
          <v-file-input
            label="Первый файл отпечатка пальца"
            v-model="firstImage"
          />
          <v-file-input
            label="Второй файл отпечатка пальца"
            v-model="secondImage"
          />
          <v-checkbox
            label="Вернуть дополнительную информацию"
            v-model="verbose"
          />
        </v-form>
        <v-btn :loading="loading" @click="startAction">Запустить</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="result">
      <v-col>
        <v-card
          ><v-card-title>Результат выполнения</v-card-title
          ><v-card-text
            ><p>Схожесть: {{ result.similarity }}</p>
            <p>
              Время выполнения на сервере: {{ result.executionTime }}
            </p></v-card-text
          ></v-card
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import http from "@/http";
export default {
  data() {
    return {
      analyzers: [
        {
          text: "Сравнение алгоритмом SIFT",
          value: "/api/sift/",
        },
        {
          text: "Сравнение нейросетью",
          value: "/api/tf/",
        },
        {
          text: "Информация о пользователе по отпечатку",
          value: "/api/recognize/",
        },
      ],
      activeAnalyzer: "/api/sift/",
      firstImage: null,
      secondImage: null,
      verbose: false,
      loading: false,
      result: null,
    };
  },
  watch: {
    activeAnalyzer() {
      this.result = null;
      this.firstImage = null;
      this.secondImage = null;
      this.verbose = false;
    },
  },
  methods: {
    async startAction() {
      this.loading = true;
      this.result = null;
      const data = {
        firstImage: this.firstImage.toString("base64"),
        verbose: this.verbose,
      };
      if (this.secondImage) {
        data.secondImage = this.secondImage.toString("base64");
      }
      const response = await http.createItem(this.activeAnalyzer, {
        data,
        showSnackbar: true,
      });
      if (response.status == 200) {
        this.result = response.data;
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>