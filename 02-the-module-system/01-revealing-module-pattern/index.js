const myModule = (() => {
  const privateFoo = () => {}
  const privateBar = []

  console.log('Inside:', privateFoo, privateBar)

  const exported = {
    publicFoo: () => {},
    publicBar: () => {},
  }

  return exported
})() // once the parenthesis here are parsed, the function will be invoked

console.log('Outside:', myModule.privateFoo, myModule.privateBar)
console.log('Module:', myModule)
