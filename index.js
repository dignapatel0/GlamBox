// import the modules/packages by using require
const express = require("express");
const path = require("path");

const { getMakeupApi, valid, getStaticData } = require("./apis");
const staticData = require('./staticData.json');

// initializing the express environment
const app = express();

// Middleware to parse form data (URL-encoded) and JSON data 
app.use(express.urlencoded({extended : true}));
app.use(express.json());

// using 8888 port
const port = 8888;

// Set the directory for views and specify Pug as the template engine
app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");

// Serve static files (CSS, JS, images) from the "public" folder
app.use(express.static(path.join(__dirname,"public")));

// Route to render the homepage
app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
});

//default value
let selectedCurrency = "USD";
let selectedBrand;
let selectedProductType;
let selectedSortBy;

//GET: http://localhost:8888/
app.get("/", async (req, res) => {
    const data = await getMakeupApi(selectedCurrency, selectedBrand, selectedSortBy, selectedProductType);
    res.render("index", { title: "Home", originUrl: '/', data: data, selectedCurrency, selectedBrand, selectedSortBy, selectedProductType, productList: staticData.uniqueProductTypes, brandList: staticData.uniqueBrands });
})

//GET: http://localhost:8888/brand/brandname
app.get("/brand/:brandName", async (req, res) => {
    const data = await getMakeupApi(selectedCurrency, req.params.brandName, selectedSortBy, selectedProductType);
    res.render("brand", { title: req.params.brandName, originUrl: `/brand/${req.params.brandName}`, data, selectedCurrency, selectedBrand, selectedSortBy, selectedProductType, productList: staticData.uniqueProductTypes, brandList: staticData.uniqueBrands })
})

//GET: http://localhost:8888/productType/producttypename
app.get("/productType/:productType", async (req, res) => {
    const data = await getMakeupApi(selectedCurrency, selectedBrand, selectedSortBy, req.params.productType);
    res.render("productType", { title: req.params.productType, originUrl: `/productType/${req.params.productType}`, data, selectedCurrency, selectedBrand, selectedSortBy, selectedProductType, productList: staticData.uniqueProductTypes, brandList: staticData.uniqueBrands })
})

//POST: http://localhost:8888/filter
app.post("/filter", async (req, res) => {
    ({ selectedBrand, selectedCurrency, selectedSortBy, selectedProductType } = req.body);

    if (!valid(selectedCurrency)) {
        selectedCurrency = undefined
    }
    res.redirect(req.body.target_url);
})

//POST: http://localhost:8888/reset
app.post("/reset", async (req, res) => {
    selectedCurrency = "USD";
    selectedBrand = undefined;
    selectedSortBy = undefined;
    selectedProductType = undefined;
    res.redirect(req.body.target_url);

})

// Call function to check and create static data if needed
//getStaticData();



