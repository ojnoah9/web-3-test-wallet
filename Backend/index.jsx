const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());

const MORALIS_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjUzNDEwOThiLTNhYjktNGE5MC05MjkwLWMwYjZmYjY1OTlmNyIsIm9yZ0lkIjoiMzc0NzcyIiwidXNlcklkIjoiMzg1MTM2IiwidHlwZUlkIjoiYWYyODA5MWUtYmZlMi00ZTY3LWJiODQtMWQ5NzJlZDEyZjk4IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDY1MjY0ODAsImV4cCI6NDg2MjI4NjQ4MH0.zEK7TuWKQIsTA9HKcOuG-uMuOWh3TnaQPyr0wC90Ut0";
app.get("/getTokens", async (req, res) => {
  const { userAddress, chain } = req.query;

  const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
    chain: "0x1",
    address: "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
  });

  const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
    chain: "0x1",
    format: "decimal",
    mediaItems: true,
    address: "0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e",
  });

  const myNfts = nfts.raw.result.map((e, i) => {
    if (
      e?.media?.media_collection?.high?.url &&
      !e.possible_spam &&
      e?.media?.category !== "video"
    ) {
      return e["media"]["media_collection"]["high"]["url"];
    }
  });

  const balance = await Moralis.EvmApi.balance.getNativeBalance({
    chain: "0x1",
    address: "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
  });

  const jsonResponse = {
    tokens: tokens.raw,
    nfts: myNfts,
    balance: balance.raw.balance / 10 ** 18,
  };

  return res.status(200).json(jsonResponse);
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
