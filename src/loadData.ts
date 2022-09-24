/** @module LoadData */
import { ethers } from 'ethers'
import pairsArr from './data/pairs.json'
import pairsAbi from './abi/uni2pair.json'
import fs from 'fs'

const provider = new ethers.providers.InfuraWebSocketProvider(
  'matic',
  process.env.INFURA_KEY
)
/**
 * Загружает данные пар c некоторым интервалом, 
 * чтобы запрос не был отменен из-за превышения лимита запросов
 * @param {array} pairs - Пары, для которых будут запрашиваться данные
 * @param {string} path - Путь до файла, в который будут записаны результаты запроса
 */
export async function loadPairs(pairs: any, path: string, ) {
  let result: any = []  
  for (let i = 0; i < Math.ceil(pairs.length / 50); i++) {
    const res = await Promise.all(pairs.splice(i*50, 50).map(async (pair: any) => {
      const pairContract = new ethers.Contract(pair.id, pairsAbi, provider)
      let token0 = await pairContract.token0()
      let token1 = await pairContract.token1()
      return {address: pair.id, tokens: [token0, token1]}
    }))
    await new Promise((resolve) => setTimeout(resolve, 20000))
    result.push(...res)
  }
  fs.writeFileSync(path, JSON.stringify(result, null, 2) , 'utf-8');
}

loadPairs(pairsArr, './pairsData.json')
