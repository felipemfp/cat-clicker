'use strict'

/*
 * Constants
 */

const CAT_CLICKER_CLICKS_KEY = 'cat-clicker-clicks-'


/*
 * Data
 */

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
}, {
  id: 'swarkles',
  name: 'Swarkles',
  imageUrl: 'images/cat-3.jpg',
  clicks: 0
}, {
  id: 'mosby-boys',
  name: 'Mosby Boys',
  imageUrl: 'images/cat-4.jpg',
  clicks: 0
}, {
  id: 'teddy',
  name: 'Teddy',
  imageUrl: 'images/cat-5.jpg',
  clicks: 0
}]


/*
 * Components
 */

const createCatComponent = function (cat) {
  let title = document.createElement('h3')
  title.innerText = cat.name

  let img = document.createElement('img')
  img.setAttribute('src', cat.imageUrl)
  img.setAttribute('alt', 'A picture of ' + cat.name)

  img.addEventListener('click', (function (id) {
    return function (e) {
      let spanClicks = e.target.parentElement.querySelector('span.clicks')
      let clicks = Number(spanClicks.innerText)

      spanClicks.innerText = (++clicks).toString()

      if (window.localStorage) {
        window.localStorage.setItem(CAT_CLICKER_CLICKS_KEY + id, clicks)
      }
    }
  })(cat.id), false)

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

const createCatListComponent = function (cat) {
  let li = document.createElement('div')
  li.setAttribute('id', cat.id)
  li.classList.add('list-item')
  li.innerText = cat.name
  li.addEventListener('click', (function (id) {
    return function () {
      render(id)
    }
  })(cat.id), false)
  return li
}


/*
 * Containers
 */

const listContainer = function (catListComponents) {
  let container = document.createElement('section')
  container.classList.add('list')
  catListComponents.forEach(function (catListComponent) {
    container.insertAdjacentElement('beforeend', catListComponent)
  })

  return container
}

const catContainer = function (catComponent) {
  let container = document.createElement('section')
  container.classList.add('container')
  container.insertAdjacentElement('beforeend', catComponent)

  return container
}


/*
 * Render
 */

const render = function (id) {
  const app = document.querySelector('#app')

  app.querySelectorAll('.list-item').forEach(li => li.classList.remove('active'))

  if (id === undefined) {
    id = cats[0].id
    app.insertAdjacentElement('beforeend', listContainer(cats.map(cat => createCatListComponent(cat))))
  }

  const cat = cats.find(cat => cat.id === id)

  app.querySelector('#' + id + '.list-item').classList.add('active')

  const catContainerRendered = app.querySelector('.container')
  if (catContainerRendered) {
    catContainerRendered.remove()
  }

  app.insertAdjacentElement('beforeend', catContainer(createCatComponent(cat)))
}
