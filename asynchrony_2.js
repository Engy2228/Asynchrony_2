const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
// функция createUserElement() создает HTML элемент в котором будет храниться user.name в виде текста
const userIds = []
const dataContainer = document.querySelector('#data-container')

const createUserElement = (text) => {
  const userIdElement = document.createElement('li')
  const userIdElementAnchor = document.createElement('a')
  userIdElementAnchor.href = '#'
  userIdElementAnchor.textContent = text
  userIdElement.append(userIdElementAnchor)

  return userIdElement
}

const getUsersByIds = (ids) => {
  const requests = ids.map((id) =>
    fetch(`${USERS_URL}/${id}`, {
      method: 'GET',
    })
  )
  Promise.all(requests /* запросы */)
    .then((responses /* ответы */) => {
      const dataResults = responses.map((respons) => respons.json())
      return Promise.all(dataResults)
    })
    .then((users) => {
      console.log('users', users)
      users.forEach((user) => {
        const userHTML = createUserElement(user.id)
        dataContainer.append(userHTML)
      })
      users.forEach((user) => {
        userIds.push(user.id)
      })
      console.log('userIds', userIds)
    })
    .catch((error) => {
      console.log(error)
    })
}
getUsersByIds([5, 6, 2, 1])
