const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongoo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/accountingproviderItem');

app.get('/about', (req, res) => {
  
  res.render('about', {balanceSheet});
});
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/review', (req, res) => {
  const balanceSheet = accountingSoftware(req.body.yearEstablished,
    req.body.summaryOfProfit)
    let sum = 0
    balanceSheet.forEach((item)=>{
       sum+= item.assetsValue 
    })
    const averageAssetValue = sum/4
    
    
    res.render('review', {balanceSheet:balanceSheet,
      summaryOfProfit:req.body.summaryOfProfit,
      loanAmount:req.body.amount,
      averageAssetValue: averageAssetValue,
      year: req.body.yearEstablished,}
    )

});

app.post('/finalApplication', (req, res) => {
    let preAssementValue = "0"
    if (req.body.summary_profit_loss > 0 && req.body.average_asset_value < req.body.loan_amount){
      preAssementValue = "60%";
    }
    else if(req.body.average_asset_value > req.body.loan_amount){
      preAssementValue = "100%";
    }
    else{
      preAssementValue = "20%";
    }

   let balance_sheet = [
    {
        "year": req.body.year_,
        "month": 12,
        "profitOrLoss": 250000,
        "assetsValue": 1234,
        "preAssementValue":preAssementValue
    
    },
    {
        "year": req.body.year_,
        "month": 11,
        "profitOrLoss": 1150,
        "assetsValue": 5789,
        "preAssementValue":preAssementValue
    },
    {
        "year": req.body.year_,
        "month": 10,
        "profitOrLoss": 2500,
        "assetsValue": 22345,
        "preAssementValue":preAssementValue
    },
    {
        "year": req.body.year_,
        "month": 9,
        "profitOrLoss": -187000,
        "assetsValue": 223452,
        "preAssementValue":preAssementValue
    }
]
    
    res.render('finalApplication', {balance_sheet})

});

function accountingSoftware(year, summaryOfProfit) {
  return sheet = [
    {
        "year": year,
        "month": 12,
        "profitOrLoss": 250000,
        "assetsValue": 1234
    },
    {
        "year": year,
        "month": 11,
        "profitOrLoss": 1150,
        "assetsValue": 5789
    },
    {
        "year": year,
        "month": 10,
        "profitOrLoss": 2500,
        "assetsValue": 22345
    },
    {
        "year": year,
        "month": 9,
        "profitOrLoss": -187000,
        "assetsValue": 223452
    }
]
}

const port = 3000;

app.listen(port, () => console.log('Server running...'));
