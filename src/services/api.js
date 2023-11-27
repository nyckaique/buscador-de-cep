//API do ViaCEP

import axios from "axios";

//baseURL: https://viacep.com.br/ws/    rota: 01001000/json/

const api = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

export default api;
