import './screens/login.js'
import './screens/register.js'
import './components/inputWrapper.js'
import { getItemLocalStorage } from './components/utils.js'
import './screens/story.js'
import './screens/header.js'
import './screens/createPost.js'
import './components/postItem.js'
import './components/listPost.js'

// document.getElementById('app').innerHTML = `
//   <register-screen></register-screen>
// `

redirect('register')
export function redirect(screenName) {
  if (screenName === 'register') {
    document.getElementById('app').innerHTML = `
      <register-screen></register-screen>
    `
  } else if (screenName === 'login') {
    document.getElementById('app').innerHTML = `
      <login-screen></login-screen>
    `
  } else if (screenName === 'story') {
    document.getElementById('app').innerHTML = `
      <story-screen></story-screen>
    `
  }
}

checkAuthen();

async function checkAuthen() {
  const user = getItemLocalStorage('currentUser');
  if (user) {
    const res = await firebase.firestore()
    .collection('users')
    .where('email', '==', user.email)
    .where('password', '==', user.password)
    .get()
    if (res.empty) {
      redirect('login');
    } else {
      redirect('story');
    }
  } else {
    redirect('login');
  }
}




