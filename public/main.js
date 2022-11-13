const socket = io()

const productsForm = document.getElementById('productsForm')

productsForm.addEventListener('submit', e => {
  e.preventDefault()
  const priceValue = document.getElementById('price-input').value
  const nameValue = document.getElementById('name-input').value
  const thumbnailValue = document.getElementById('thumbnail-input').value

  const product = {
    price: priceValue,
    name: nameValue,
    thumbnail: thumbnailValue
  }
  socket.emit('NEW_PRODUCT_CLI', product)
  e.target.reset()
})

socket.on('NEW_PRODUCT_SERVER', newProduct => {
  const tableBody = document.querySelector('#table-body')
  const newTr = document.createElement('tr')

  newTr.innerHTML = `<td>${newProduct.name}</td>
  <td>$ ${newProduct.price}</td>
  <td>
    <img
      src="${newProduct.thumbnail}"
      alt="${newProduct.name} icon"
      width="100"
      height="100"
    />
  </td>
  <td>${newProduct.id}</td>`

  tableBody.appendChild(newTr)
})

const messagesForm = document.querySelector('#messagesForm')

messagesForm.addEventListener('submit', e => {
  e.preventDefault()
  const emailValue = document.getElementById('email-input').value
  const msjValue = document.getElementById('message-input').value

  const message = {
    email: emailValue,
    content: msjValue
  }

  socket.emit('NEW_MESSAGE_CLI', message)
  e.target.reset()
})

socket.on('NEW_MESSAGE_SERVER', newMessage => {
  const messagesUl = document.getElementById('messagesUl')
  const newLi = document.createElement('li')
  newLi.classList.add('messageLi')

  newLi.innerHTML = `<div class="messageEmailDiv">${newMessage.email}</div>
  <div class="messageContentDiv">${newMessage.content}</div>`

  messagesUl.appendChild(newLi)
})
