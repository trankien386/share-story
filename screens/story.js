class storyScreen extends HTMLElement {
  constructor() {
    super();
    this.sdRoot = this.attachShadow({mode:'open'});
  }

  connectedCallback() {
    this.sdRoot.innerHTML = `
      <story-header
        logo='./logo.png'
        title='Share story'
        profile-icon='./profile.png'
        logout-icon='./logout.png'
      ></story-header>

      <create-post></create-post>
      <list-post></list-post>
    `
  }
}

customElements.define('story-screen', storyScreen);


