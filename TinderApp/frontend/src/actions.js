export const COMPUTE = "app/AMAZON"



function isJSONResponse(r) {
  return r.headers.get('Content-Type').indexOf('json') > 0
}

const resource = (method, endpoint, payload) => {
  const options = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) options.body = JSON.stringify(payload)

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      console.log("Fetch response is ", r.headers.get('Content-Type'))
      if (r.status === 200) {
        if (isJSONResponse(r)){
          return r.json().then(json => json)
        }
        else {
          return r.text().then(text => text)
        }
      } else {
        //to deebug
        console.log(`${method} ${endpoint} ${r.statusText}`)
        // throw new Error(r.statusText)
        if (isJSONResponse(r)) {
          return r.json().then(
            json => {throw new Error(json.error)}
          )
        }
      }
    })
}

export default resource
