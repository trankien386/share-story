import { redirect } from '../index.js'
import { getDataFromDocs, saveToLocalStorage, } from '../components/utils.js'

class loginSceen extends HTMLElement{
  constructor() {
    super()
    this.sdRoot = this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.sdRoot.innerHTML = `
      <style>
        ${style}
      </style>
      <div class="login-container">
        <form id="login-form">
          <h1>CI Project</h1>
          <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper>
          <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
          <button id='login-btn'>Login</button>
          <span>Don't have an account ?</span>
          <a id="redirect"> Create one</a>
        </form>
      </div>
    `

    const loginForm = this.sdRoot.getElementById('login-form');
    loginForm.addEventListener('keypress', async (e) => {
      if (e.key === 'Enter') {
        this.sdRoot.getElementById('login-btn').click();
      }
    })

    loginForm.addEventListener('submit', async(e) => {
      e.preventDefault();
      const email = this.sdRoot.getElementById('email').value;
      const password = this.sdRoot.getElementById('password').value;

      let isValid = true;
      if (email.trim() === '') {
        isValid = false;
        this.setError('email', 'Please input email');
      }

      if (password.trim() === '') {
        isValid = false;
        this.setError('password', 'Please input password');
      }

      if (!isValid) {
        return
      }

      const user = await firebase.firestore()
      .collection('users')
      .where('email', '==', email)
      .where('password', '==', CryptoJS.MD5(password).toString())
      .get()

      if(user.empty) {
        alert('Sai email/ password')
      } else {
        // console.log(getDataFromDocs(user)[0])
        saveToLocalStorage('currentUser', getDataFromDocs(user)[0]);
        redirect('story');
      }
    })

    this.sdRoot.getElementById('redirect')
    .addEventListener('click', () => {
      redirect('register')
    })
  }

  setError(id, message) {
    this.sdRoot.getElementById(id)
    .setAttribute('error', message)
  }
}

const style = `
  .login-container {
    width: 100vw;
    height: 100vh;
    background: url('https://cdn.wallpapersafari.com/87/60/VevGj8.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: flex-end;
  }

  #login-form{
    width: 30%;
    background: #fff;
    height: 100vh;
    padding: 0px 20px;
  }

  h1{
    text-align: center;
    color: #333;
  }

  button {
    background: #1565C0;
    color: #fff;
    padding: 10px 15px;
    border-radius: 5px;
  }
`

customElements.define('login-screen', loginSceen);
