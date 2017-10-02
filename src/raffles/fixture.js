import shuffle from 'array-shuffle'
import raffle from '../core/raffle'
import players from '../../data/players'
import { range, cycle, zip } from '../core/lib'

const fixtureShuffle = () => {
  const players = shuffle(players)
  range(players.length).map(value => ({
    round: value,
    games: zip(players, cycle(players, value))
  }))
}

const INTERVALS = {
  SAVED: 3000,
  LAST: 10000,
  DOOMED: 0
}

const logFuncs = {
  SAVED: player => `El próximo que se salva es 🙋‍♂️  ${player}`,
  LAST: player => `El ULTIMO que se salva es 🙋‍♂️  ${player}`,
  DOOMED: player => `JUEGA EL COLCHESTER BOWL 🙋‍♂️  ${player}`
}

const status = position => {
  const treshold = players.length - 3
  if (position < treshold) return 'SAVED'
  if (position === treshold) return 'LAST'
  if (position > treshold) return 'DOOMED'
}

const run = () =>
  raffle({
    shuffler: fixtureShuffle,
    announcer: (player, position) => [
      { data: { player }, interval: INTERVALS[status(position)] }
    ],
    logger: ({ player = '...' }, position) => logFuncs[status(position)](player)
  })

export default {
  name: 'Colchester Bowl',
  run
}
