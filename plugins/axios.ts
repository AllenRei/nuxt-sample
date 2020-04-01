import { setClient } from "~/api"
export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      localStorage.clear();
      redirect('/401')
    }
  })
  console.log('plug')
  setClient($axios);
}
