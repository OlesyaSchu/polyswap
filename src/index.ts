/** 
 * Арбитражный бот на сети Polygon
 * [Мой github с другими работами]{@link https://github.com/olesyaschu GitHub} <br/>
 */
import { ethers } from 'ethers'
import pairsQuick from './data/pairsQuick.json'
import pairsUni3 from './data/pairsUni3.json'

/** Создаем провайдер для дальнейших манипуляций с блокчейн сетью */
const provider = new ethers.providers.InfuraWebSocketProvider(
  'matic',
  process.env.INFURA_KEY
)

/** Создаем пары с указанием их бирж в отдельном поле */
const quick = { name: 'quickswap', pairs: pairsQuick}
const uni3 = { name: 'uniswap3', pairs: pairsUni3}
/** Создаем массив exchanges для получения trades */
const exchanges = [quick, uni3]

/**
 * Создает id с помощью токенов, по которым сортирует пары
 * [Загрузка бирж]{@link module:LoadData~loadPairs} <br/>
 * @param {array} exchanges - Биржи с их парами
 * @description Отдает объект с парами-ключами и биржами, на которых есть эти пары
 * @returns {object} 
 */
function getTrades(exchanges: any) {
  const trades: any = {}
  exchanges.forEach((exchange: any) => {
    exchange.pairs.forEach((pair: any) => {
      const id: string = [...pair.tokens].sort().join(':').toLowerCase()
      trades[id] = [...trades[id], {exchange, pair}]
    })
  })
  return trades
}

const trades = getTrades(exchanges)
