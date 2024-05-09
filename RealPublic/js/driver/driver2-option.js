

//Priemro obtener la ruta
const url = new URL('http://127.0.0.1:8000/api/user/list/')

const searchParams = url.searchParams

const keys = [...searchParams.keys()]

const object1 = keys
  .reduce((obj, key) =>({...obj, [key]: searchParams.get(key) }), {})
  
const object2 = [...searchParams.entries()]
  .reduce((obj, [key, value]) => ({...obj, [key]: value }), {})

  //Se muestra como objetos
console.log(object1)
console.log(object2)

// [[key1, value1], ...]
console.log([...searchParams.entries()])
// [key1, key2, ...]
console.log([...searchParams.keys()])
// [value1, value2, ...]
console.log([...searchParams.values()])