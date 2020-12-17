import { removeItemFromLocalStorage } from '../components/utils.js'
import { redirect } from '../index.js'

class storyHeader extends HTMLElement {
  constructor() {
    super();
    this.sdRoot = this.attachShadow({mode:'open'});
    this.logo = this.getAttribute('logo');
    this.title = this.getAttribute('title');
    this.profile = this.getAttribute('profile-icon');
    this.logout = this.getAttribute('logout-icon');
  }

  connectedCallback() {
    this.sdRoot.innerHTML = `
      <style>${style}</style>

      <div id='header'>
        <div class='header-logo'>
          <a>
            <img src='${this.logo}'>
          </a>
        </div>

        <div class='title'>
          <span>${this.title}</span>
        </div>

        <div class='profile'>
          <a>
            <img src='${this.profile}'>
          </a>
        </div>

        <div class='log-out'>
          <a id='log-out-button'>
            <img src='${this.logout}'>
          </a>
        </div>
      </div>
    `
    this.sdRoot.getElementById('log-out-button').onclick = () => { 
      // Delete key from localStorage
      // localStorage.removeItem("currentUser");
      removeItemFromLocalStorage('currentUser');

      // Reload current page
      // location = location;

      // Go back to login page
      redirect('login');
    };
  }
}

const style = `
  #header {
    display: flex;
    box-shadow: 0 4px 2px -2px #ccc;
    height: 55px;

    /* Căn giữa theo chiều dọc */
    align-items: center !important;
  }

  #header a {
    cursor: pointer;
  }

  #header a img {
    width: 36px;
  }

  #header .header-logo {
    margin: 0px 10px;
  }

  #header .title {
    font-size: 1.8rem;
    font-weight: 350;
  }

  #header .profile {
    margin-left:auto;
    margin-right: 20px;
  }

  #header .log-out {
    margin-right: 15px ;
  }

`

customElements.define('story-header', storyHeader);


