import axios from "axios";

const base_url = "http://5.35.104.147:3333/";

export const $api = axios.create({
    baseURL:base_url
});


