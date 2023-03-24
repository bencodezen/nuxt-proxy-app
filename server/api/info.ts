export default defineEventHandler(async event => {
  const query = getQuery(event)

  const response: any = await globalThis.fetch(
    'https://cat-fact.herokuapp.com/facts/'
  )

  event.node.res.statusCode = response.status
  event.node.res.statusMessage = response.statusText

  for (const [key, value] of response.headers.entries()) {
    if (['content-encoding', 'content-length'].includes(key)) continue

    event.node.res.setHeader(key, value)
  }

  if (query.raw) {
    console.log('RAW REQUEST')
    const data = new Uint8Array(await response.arrayBuffer())
    event.node.res.end(data)
  } else {
    console.log('JSON REQUEST')
    event.node.res.write(JSON.stringify(await response.json()))
    event.node.res.end()
  }
})
