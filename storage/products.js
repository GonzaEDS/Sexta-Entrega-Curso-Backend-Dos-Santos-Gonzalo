const Container = require('./contenedor.js')
let products = new Container('products.txt')

module.exports = products

let text1 = async () => {
  try {
    console.log(products)
    await products.save({
      title: 'Escuadra',
      price: 123.42,
      thumbnail:
        'https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-16-1024.png'
    })
    await products.save({
      title: 'Escuadra',
      price: 123.42,
      thumbnail:
        'https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-16-1024.png'
    })
    await products.save({
      title: 'Escuadra',
      price: 123.42,
      thumbnail:
        'https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-16-1024.png'
    })
  } catch (error) {
    console.log(error)
  }
}
