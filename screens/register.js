import { redirect } from '../index.js'

class RegisterScreen extends HTMLElement {
  constructor() {
    super();
    this.sdRoot = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.sdRoot.innerHTML = `
    <style>
      ${style}
    </style>
      <div class="register-container">
        <form id="register-form">
          <h1>CI Project</h1>
          <input-wrapper id="first-name" type="text" placeholder="First Name"></input-wrapper>
          <input-wrapper id="last-name" type="text" placeholder="Last Name"></input-wrapper>
          <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper>
          <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
          <input-wrapper id="confirm-password" type="password" placeholder="Retype your password again"></input-wrapper>
          <button>Register</button>
          <span>Already have an account ?</span>
          <a id="redirect"> Login</a>
        </form>
      </div>
    `
    const registedForm = this.sdRoot.getElementById('register-form')
    registedForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // console.log(this.sdRoot.getElementById('first-name').getValue());
      const firstName = this.sdRoot.getElementById('first-name').value;
      const lastName = this.sdRoot.getElementById('last-name').value;
      const email = this.sdRoot.getElementById('email').value;
      const password = this.sdRoot.getElementById('password').value;
      const confirmPassword = this.sdRoot.getElementById('confirm-password').value;

      let isValid = true;
      if (firstName.trim() === '') {
        isValid = false;
        this.setError('first-name', 'Please input first name');
      }

      if (lastName.trim() === '') {
        isValid = false;
        this.setError('last-name', 'Please input last name');
      }

      if (email.trim() === '') {
        isValid = false;
        this.setError('email', 'Please input email');
      }

      if (password.trim() === '') {
        isValid = false;
        this.setError('password', 'Please input password');
      }

      if (confirmPassword.trim() === '') {
        isValid = false;
        this.setError('confirm-password', 'Please input confirm password');
      }

      if (password !== confirmPassword) {
        isValid = false;
        this.setError('confirm-password', "Password didn't match");
      }

      if (!isValid) {
        return
      }

      const user = {
        fullName: firstName + ' ' + lastName,
        email: email,
        password: CryptoJS.MD5(password).toString()
      }

      firebase.firestore().collection('users').add(user);
      redirect('login');

      // Neu email da ton tai, tra ra true
      // const check = await this.checkEmailExist(email);
      // if (check) { 
      //   alert('Email đã được đăng ký')
      // } else {
      //   firebase.firestore().collection('users').add(user)
      //   alert('Đăng ký thành công')
      //   redirect('login')
      // }
    })

    this.sdRoot.getElementById('redirect').addEventListener('click', () => {
      redirect('login');
    })
  }

  setError(id, message) {
    this.sdRoot.getElementById(id).setAttribute('error', message);
  }

async checkEmailExist(email) {
    const res = await firebase.firestore().collection('users').where('email', '==', email).get();
    return !res.empty;
  }
}

customElements.define('register-screen', RegisterScreen);

const style = `
  .register-container {
    width: 100vw;
    height: 100vh;
    background: url("https://cdn.wallpapersafari.com/87/60/VevGj8.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: flex-end;
  }

  #register-form {
    width: 30%;
    background: #fff;
    height: 100vh;
    padding: 0px 30px;
  }
  
  h1 {
    text-align: center;
    color: #333;
  }

  button {
    background: #1565C0;
    color: #fff;
    padding: 10px 15px;
    border-radius: 6px;
  }
`

