const fs = require('fs')

class Container {
  constructor(fileName) {
    this.fileName = `./storage/${fileName}`
    this.count = 0
  }
  async createOrReset(type) {
    try {
      await fs.promises.writeFile(this.fileName, '[]')
      console.log(type)
    } catch (error) {
      console.error(error)
    }
  }

  async save(product) {
    let array = []
    try {
      array = await fs.promises.readFile(this.fileName, 'utf-8')
      array = JSON.parse(array)
      this.count = [...array].pop().id
    } catch (error) {
      try {
        await this.createOrReset('container created')
      } catch (err) {
        console.error(error)
      }
    }
    const newProduct = {
      ...product,
      id: this.count + 1
    }

    array.push(newProduct)
    array = JSON.stringify(array, null, 3)
    await fs.promises.writeFile(this.fileName, array)
    return newProduct
  }

  async getById(num) {
    try {
      const data = await fs.promises.readFile(this.fileName, 'utf-8'),
        jsonData = JSON.parse(data),
        found = jsonData.find(element => element.id === num)
      if (found) {
        return found
      } else {
        console.log(`ID "${num}" not found`)
        return null
      }
    } catch (err) {
      throw new Error(err)
    }
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.fileName, 'utf-8'),
        jsonData = await JSON.parse(data)
      if (data.length > 0) {
        return jsonData
      } else {
        return null
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async getOne() {
    try {
      const data = await fs.promises.readFile(this.fileName, 'utf-8')
      const jsonData = await JSON.parse(data)
      if (jsonData.length > 0) {
        const random = parseInt(Math.random() * jsonData.length)
        return jsonData[random]
      } else {
        return null
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async putById(id, prop) {
    try {
      let data = await fs.promises.readFile(this.fileName, 'utf-8')
      const jsonData = JSON.parse(data)
      let product = jsonData.find(pro => pro.id == id)
      //si existe lo modifico
      if (product) {
        product = {
          ...product,
          ...prop
        }
        data = jsonData.map(prod => {
          if (prod.id == product.id) {
            prod = product
          }
          return prod
        })
        const stringData = JSON.stringify(jsonData, null, 3)
        //lo guardo en el archivo
        await fs.promises.writeFile(this.fileName, stringData)
        return product
      } else {
        return null
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteById(num) {
    try {
      const data = await fs.promises.readFile(this.fileName, 'utf-8'),
        jsonData = JSON.parse(data),
        foundIndex = jsonData.findIndex(element => element.id === num)
      if (foundIndex !== -1) {
        jsonData.splice(foundIndex, 1)
        fs.writeFileSync(this.fileName, JSON.stringify(jsonData, null, 2))
        return num
      } else {
        console.log(`ID "${num}" not found`)
        return null
      }
    } catch (err) {
      throw new Error(err)
    }
  }
  deleteAll() {
    fs.writeFileSync(`./${this.fileName}`, '[]')
  }
}

module.exports = Container
