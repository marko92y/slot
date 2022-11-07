import {tokenMap} from '../sprites/SlotToken'

const tokenList = Object.keys(tokenMap)
const tokenLen = tokenList.length

const genRndToken = () => tokenList[Math.floor(Math.random() * tokenLen)]

