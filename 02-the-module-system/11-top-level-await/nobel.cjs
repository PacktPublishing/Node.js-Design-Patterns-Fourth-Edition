'use strict'

exports.loadData = async function loadData() {
  const response = await fetch('https://api.nobelprize.org/v1/prize.json')
  return response.json()
}
