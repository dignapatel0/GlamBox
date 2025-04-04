const axios = require("axios");
const fs = require('fs')
const path = require('path')

const makeupApi = axios.create({
    baseURL: "http://makeup-api.herokuapp.com/api/v1"
})

const forexApi = axios.create({
    baseURL: "https://v6.exchangerate-api.com/v6/6b2339132faba01cf501a42f",

})

const valid = (val) => {
    if (val === "" || val === undefined || val === null) {
        return false;
    }
    return true;
}


// The function to fetch the static data from makeup api and store them into staticData.json file in the root dir
const getStaticData = async () => {
    console.log("Fetch static data");
    const response = await makeupApi.get(`/products.json`);
    const staticData = { uniqueBrands: [...new Set(response.data.map(each => each.brand))].filter((x) => x !== null), uniqueProductTypes: [...new Set(response.data.map(each => each.product_type))].filter((x) => x !== null) };
    // save it in json file
    fs.writeFile('./staticData.json', JSON.stringify(staticData), () => {
        console.log('fetch unique brands and product types are DONE')
    })

}

// getForexRate function to get the data from the API
const getForexRate = async (currency) => {
    if (!currency) return 1;
 
    const response = await forexApi.get(`/latest/USD?base=USD`);
 
    // Log the API response to ensure correct structure
    // console.log("API Response:", response.data);
 
    // Check if the response contains the conversion_rates object
    if (!response.data || !response.data.conversion_rates || !response.data.conversion_rates[currency]) {
        console.error(`Currency ${currency} not found in the response`);
        return 1; // Return 1 if the currency is not found
    }
 
    return response.data.conversion_rates[currency];  // Fetch the rate from conversion_rates
 };
 
// getMakeupApi function to het the data from API
const getMakeupApi = async (currency, brand, sortBy, productType) => {
    const response = await makeupApi.get('/products.json', (valid(brand) && !valid(productType)) ? { params: { brand: brand } } : (!valid(brand) && valid(productType)) ? { params: { product_type: productType } } : (valid(brand) && valid(productType)) ? { params: { brand: brand, product_type: productType } } : {});
    const rate = await getForexRate(currency);
    const filterNonZeroPrice = (val) => val.price !== 0;
    const nonZeroPriceProducts = response.data.map(each => ({ ...each, price: (each.price * rate) })).filter(filterNonZeroPrice);
    (sortBy === "low to high") ? nonZeroPriceProducts.sort((a, b) => a.price - b.price) : (sortBy === "high to low") ? nonZeroPriceProducts.sort((a, b) => b.price - a.price) : nonZeroPriceProducts;
    const data = nonZeroPriceProducts.map(each => ({ ...each, price: `${currency} ${(each.price).toFixed(2)}` }));
    return data;
}

module.exports = { getMakeupApi, valid, getStaticData, makeupApi };