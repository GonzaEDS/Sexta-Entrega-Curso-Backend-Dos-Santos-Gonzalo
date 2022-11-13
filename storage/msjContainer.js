const fs = require('fs')

class MsjContainer {
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

  async save(message) {
    let array = []
    try {
      array = await fs.promises.readFile(this.fileName, 'utf-8')
      array = JSON.parse(array)
      this.count = parseInt([...array].pop().id)
    } catch (error) {
      try {
        await this.createOrReset('container created')
      } catch (err) {
        console.error(error)
      }
    }
    const newMessage = {
      ...message,
      id: this.count + 1
    }

    array.push(newMessage)
    array = JSON.stringify(array, null, 3)
    await fs.promises.writeFile(this.fileName, array)
    return newMessage
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
}

module.exports = MsjContainer
