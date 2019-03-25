import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AppState } from "@/app.state";

type MongoId = string;
import Vue, { ComponentOptions } from 'vue'
interface Next<T extends Vue = Vue> {
  (to?: (vm: T) => any): void
}
// 2. Укажите файл с типами, которые вы хотите расширить
//    Vue имеет тип конструктора в types/vue.d.ts
declare module 'vue/types/vue' {
  // 3. Объявите расширение для Vue
  interface Vue {
    $app: AppState
    $v: any
  }
}
declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    validations?: any;
  }
}

declare module 'vue-router' {
  interface Next<T extends Vue = Vue> {
    (to?: (vm: T) => any): void
  }
}

