'use strict'

const CAT_CLICKER_CLICKS_KEY = 'cat-clicker-clicks-'

const cats = [{
  id: 'lilypad',
  name: 'Lilypad',
  imageUrl: 'images/cat-1.jpg',
  clicks: 0
}, {
  id: 'marshmallow',
  name: 'Marshmallow',
  imageUrl: 'images/cat-2.jpg',
  clicks: 0
}]

const handleClick = function (id) {
  return function (e) {
    let spanClicks = e.target.parentElement.querySelector('span.clicks')
    let clicks = Number(spanClicks.innerText)

    spanClicks.innerText = (++clicks).toString()

    if (window.localStorage) {
      window.localStorage.setItem(CAT_CLICKER_CLICKS_KEY + id, clicks)
    }
  }
}

const createCatComponent = function (cat) {
  let title = document.createElement('h3')
  title.innerText = cat.name

  let img = document.createElement('img')
  img.setAttribute('src', cat.imageUrl)
  img.setAttribute('alt', 'A picture of ' + cat.name)
  img.addEventListener('click', handleClick(cat.id), false)

  let spanClicks = document.createElement('span')
  let clicks = 0
  if (window.localStorage) {
    clicks = Number(window.localStorage.getItem(CAT_CLICKER_CLICKS_KEY + cat.id) || 0)
  }
  spanClicks.classList.add('clicks')
  spanClicks.innerText = clicks.toString()

  let figCaption = document.createElement('figcaption')
  figCaption.insertAdjacentElement('beforeend', spanClicks)
  figCaption.insertAdjacentText('beforeend', ' clicks.')

  let figure = document.createElement('figure')
  figure.insertAdjacentElement('beforeend', img)
  figure.insertAdjacentElement('beforeend', figCaption)

  let parent = document.createElement('div')
  parent.setAttribute('id', cat.id)
  parent.classList.add('cat')
  parent.insertAdjacentElement('beforeend', title)
  parent.insertAdjacentElement('beforeend', figure)

  return parent
}

const insertTo = function (parent) {
  return function (child) {
    parent.insertAdjacentElement('beforeend', child)
  }
}

const catComponents = cats.map(createCatComponent)

const container = document.createElement('div')
container.classList.add('container')
catComponents.forEach(insertTo(container))

document.querySelector('#app').insertAdjacentElement('beforeend', container)
