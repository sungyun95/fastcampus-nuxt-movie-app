const express = require("express");
const axios = require("axios");

const app = express();
const { OMDB_API_KEY } = process.env;

// app에 플러그인 연결, body 내용 해석
app.use(express.json());
app.post("/", async (req, res) => {
  // ...
  // res.status(200).json("Heropy!");

  const payload = req.body;
  const { title, type, year, page, id } = payload;
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  try {
    const { data } = await axios.get(url);
    if (data.Error) {
      res.status(400).json(data.error);
    }
    // json : JSON.strigify 필요 없음!
    res.status(200).json(data);
  } catch (error) {
    res.status(error.response.status).json(error.message);
  }
});
// const res = axios.post('xxx')
// console.log(res.data) // 'xxx'
module.exports = app;
