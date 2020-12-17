class inputWrapper extends HTMLElement {
  constructor() {
    super();
    this.sdRoot = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.type = this.getAttribute('type');
    this.placeholder = this.getAttribute('placeholder');
    this.error = this.getAttribute('error') || '';
    this.sdRoot.innerHTML = `
      <style>
        ${style}
      </style>
      <div class="input-wrapper">
        <input id="input-main" type="${this.type}" placeholder="${this.placeholder}"/>
        <div class="error">${this.error}</div>
      </div>
    `
  }

  static get observedAttributes() {
    return ['error'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'error') {
      this.sdRoot.querySelector('.error').innerHTML = newValue;
    }
  }

  get value() {
    const value = this.sdRoot.getElementById('input-main').value;
    return value;
  }

}

const style = `
  .error {
    color: red;
  }

  input {
    border-radius: 6px;
    width: 100%;
    border: 1px solid #dbdbdb;
    padding: 12px;
    box-sizing: border-box;
    outline: none;
  }

  .input-wrapper {
    margin-bottom: 10px;
  }
`

customElements.define('input-wrapper', inputWrapper);

