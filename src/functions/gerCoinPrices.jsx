import axios from "axios";

export const getCoinPrices = async (id, days) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );
    console.log("Prices>>>>", response.data.prices);
    return response.data.prices;
  } catch (error) {
    console.log("ERROR>>>", error);
    return [];
  }
};
