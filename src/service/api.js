import axios from "axios";

export const API = axios.create({
  baseURL: "https://api.gearfocus.div4.pgtest.co",
  headers: {
    Authorization:
      "9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275",
  },
});
