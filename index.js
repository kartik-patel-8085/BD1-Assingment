const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

function cartTotalA(newItemPrice, cartTotal) {
  return String(Number(newItemPrice) + Number(cartTotal));
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(cartTotalA(newItemPrice, cartTotal));
});

function MemberShipDiscount(cartTotal, isMember) {
  let disTotal = (Number(cartTotal) * Number(discountPercentage)) / 100;
  return String(cartTotal - disTotal);
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = req.query.cartTotal;
  let isMember = req.query.isMember;
  if (isMember) {
    res.send(MemberShipDiscount(cartTotal, isMember));
  } else {
    res.send(cartTotal);
  }
});

function tax(cartTotal) {
  let disTotal = (Number(cartTotal) * Number(taxRate)) / 100;
  return String(disTotal);
}
app.get('/calculate-tax', (req, res) => {
  let cartTotal = req.query.cartTotal;
  res.send(tax(cartTotal));
});

function carestimatetDelivery(shippingMethod, distance) {
  if (shippingMethod === 'express') {
    return Number(distance) / 100;
  } else if (shippingMethod === 'standard') {
    return Number(distance) / 50;
  }
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = req.query.distance;
  res.send(carestimatetDelivery(shippingMethod, distance).toString());
});

function shippingCost(weight, distance) {
  return Number(weight) * Number(distance) * 0.1;
}
app.get('/shipping-cost', (req, res) => {
  let weight = req.query.weight;
  let distance = req.query.distance;
  res.send(shippingCost(weight, distance).toString());
});

function loyaltyPoints(purchaseAmoun) {
  return Number(purchaseAmoun) * Number(loyaltyRate);
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmoun = req.query.purchaseAmount;
  res.send(loyaltyPoints(purchaseAmoun).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
