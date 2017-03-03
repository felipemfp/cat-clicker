'use strict'

const CAT_CLICKER_IMAGE_ELEMENT = 'figure img'
const CAT_CLICKER_AMOUNT_ELEMENT = 'figure .amount'
const CAT_CLICKER_AMOUNT_KEY = 'cat-clicker-amount'

var n = 0
if (window.localStorage) {
  n = Number(window.localStorage.getItem(CAT_CLICKER_AMOUNT_KEY) || 0)
}

var imgElement = document.querySelector(CAT_CLICKER_IMAGE_ELEMENT)
var nElement = document.querySelector(CAT_CLICKER_AMOUNT_ELEMENT)

nElement.innerText = n.toString()

var handleClick = function (e) {
  nElement.innerText = (++n).toString()
  if (window.localStorage) {
    window.localStorage.setItem(CAT_CLICKER_AMOUNT_KEY, n)
  }
}

imgElement.addEventListener('click', handleClick, false)
