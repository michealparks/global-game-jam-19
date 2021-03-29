import { shuffleArray } from './util'

const textEl = document.getElementById('inspiration')
const bottomTextEl = document.getElementById('bottomtext')

const quotes = [
  'HOME IS WHERE YOUR FIST IS.',
  'YOU\'VE NEVER FELT SO ALIVE.',
  'HOME IS THE NICEST WORD THERE IS.',
  'YOU WONDER WHAT\'S FOR DINNER.',
  'FOLLOW YOUR BLISS.',
  'WE ARE WHO WE ARE.',
  'HOME IS NOT A PLACE. IT\'S A FEELING.',
  'JUST GO WITH THE FLOW.',
  'IT\'S PAST THEIR BEDTIME.',
  'THERE\'S NO PLACE LIKE HOME.',
  'AGE IS JUST A NUMBER.',
  'WE\'LL ALL BE LAUGHING ABOUT THIS SOON.',
  'DON\'T FORGET TO PAY THE MORTGAGE.', 
  'THINGS COULD BE WORSE.',
  'TAKE LEMONS AND MAKE LEMONADE.',
  'YOU\'LL REGRET THE THINGS YOU DIDN\'T DO.',
  'THE AZALEAS NEED TO BE WATERED.',
  'WORK HARD, PLAY HARD.',
  'GOTTA FIX THAT CREAKY FLOORBOARD.',
  'SOMETIMES YOU JUST GOTTA EAT THE HAM SANDWICH.',
  'REX IS DUE FOR A CHECKUP.',
  'FIND OUT IF THIS IS TAX DEDUCTABLE'
  // HOME IS NO PLACE FOR ARMCHAIR PHILOSOPHERS
]

const order = []

const len = quotes.length
let id1 = -1, id2 = -1

function restart () {
  for (let i = 0, l = len; i < l; i++) {
    order.push(i)
  }

  shuffleArray(order)
}

function inspire () {
  if (order.length === 0) restart()

  textEl.innerText = quotes[order.pop()]
  id2 = setTimeout(function () {
    textEl.innerText = ''
  }, 7000)
}

export function startInspire () {
  id1 = setInterval(inspire, 10000)
}

export function endInspire () {
  clearTimeout(id1)
  clearTimeout(id2)
  textEl.innerText = ''
}

export function displayText (text, bottomText) {
  textEl.innerText = text || ''
  bottomTextEl.innerText = bottomText || ''
}
