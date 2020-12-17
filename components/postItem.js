import { convertDate } from "../components/utils.js"

class postItem extends HTMLElement {
  constructor() {
    super();
    this.sdRoot = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.author = this.getAttribute('author');
    this.time = convertDate(this.getAttribute('time'));
    this.content = this.getAttribute('content');
    this.sdRoot.innerHTML = `
      <style>${style}</style>
      <div class="post-item">
        <div class="author-name">${this.author}</div>
        <div class="time">${this.time}</div>
        <div class="content">
          <p>${this.content}</p>
        </div>
      </div>
    `
  }
}


const style = `
  .post-item {
   border: 1px solid ;
   padding: 20px;
   border-radius: 6px;
   margin: 15px 50px;
  }

  .author-name {
   font-weight: 600;
   margin-bottom: 10px;
  }

  .time {
   font-size: 12px;
  }

`

customElements.define('post-item', postItem);
