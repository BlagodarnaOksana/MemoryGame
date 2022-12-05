const cardArray = [
  {
    name: 'apple',
    img: 'img/apple.png'
  },
  {
    name: 'balloon',
    img: 'img/balloon.png'
  },
  {
    name: 'heart',
    img: 'img/heart.png'
  },
  {
    name: 'spanchbob',
    img: 'img/spanchbob.png'
  },
  {
    name: 'spiderman',
    img: 'img/spiderman.png'
  },
  {
    name: 'star',
    img: 'img/star.png'
  },
  {
    name: 'apple',
    img: 'img/apple.png'
  },
  {
    name: 'balloon',
    img: 'img/balloon.png'
  },
  {
    name: 'heart',
    img: 'img/heart.png'
  },
  {
    name: 'spanchbob',
    img: 'img/spanchbob.png'
  },
  {
    name: 'spiderman',
    img: 'img/spiderman.png'
  },
  {
    name: 'star',
    img: 'img/star.png'
  }
]

cardArray.sort(() => 0.5 - Math.random())

let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []
const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
const popupMatch = document.querySelector('#popup')
const btnStart = document.querySelector('#start')

btnStart.addEventListener('click', startGame)

function startGame() {
  const txtScore = document.querySelector('#txtScore')
  txtScore.style.visibility = "visible"
  createBoard()
}

function createBoard() {
  btnStart.style.visibility = "hidden"

  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img')
    card.setAttribute('src', 'img/blank.png')
    card.setAttribute('data-id', i)
    card.setAttribute('width', '150px')
    card.setAttribute('heigth', '150px')
    card.addEventListener('click', flipCard)
    gridDisplay.appendChild(card)
  }
}

function checkMatch() {
  const cards = document.querySelectorAll('img')
  const optionOneId = cardsChosenIds[0]
  const optionTwoId = cardsChosenIds[1]
  console.log(cards)

  if (optionOneId == optionTwoId) {
    cards[optionOneId].setAttribute('src', 'img/blank.png')
    cards[optionTwoId].setAttribute('src', 'img/blank.png')
  }

  if (cardsChosen[0] == cardsChosen[1]) {
    cards[optionOneId].setAttribute('src', 'img/white.png')
    cards[optionTwoId].setAttribute('src', 'img/white.png')
    cards[optionOneId].removeEventListener('click', flipCard)
    cards[optionTwoId].removeEventListener('click', flipCard)
    cardsWon.push(cardsChosen)
    showPopup('Yeee, You found the match!')
  } else {
    cards[optionOneId].setAttribute('src', 'img/blank.png')
    cards[optionTwoId].setAttribute('src', 'img/blank.png')
    showPopup('Try agan')
    console.log("нет совпадений, добавить анимацию")
  }

  if (cardsChosen.length > 2) {
    console.log("Выбрано больше 2х карт")
    for (let i = 0; i < cards.length; i++) {
      cards[i].setAttribute('src', 'img/blank.png')
    }
  }

  resultDisplay.textContent = cardsWon.length
  cardsChosen = []
  cardsChosenIds = []

  if (cardsWon.length == cardArray.length / 2) {
    resultDisplay.textContent = 'Congratulations, You found them all!'
    popupMatch.style.visibility = "hidden"
    setTimeout(function () { location.reload() }, 4000)
  }
}

function flipCard() {
  const cardId = this.getAttribute('data-id')
  cardsChosen.push(cardArray[cardId].name)
  cardsChosenIds.push(cardId)
  console.log(cardsChosen)
  console.log(cardsChosenIds)
  this.setAttribute('src', cardArray[cardId].img)

  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500)
  }
}

function showPopup(txt) {
  popupMatch.style.visibility = "visible"
  popupMatch.textContent = txt
  setTimeout(function () { popupMatch.style.visibility = "hidden" }, 2000)
}

