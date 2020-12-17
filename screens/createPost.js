import { getItemLocalStorage } from '../components/utils.js'

class creatPost extends HTMLElement {
  constructor() {
    super();
    this.sdRoot = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.sdRoot.innerHTML = `
      <style>${style}</style>
      <form id='create-post'>
        <textarea name='content' row='4'></textarea>
        <button id='post-btn'>POST</button>
      </form>
    `

    const postForm = this.sdRoot.getElementById('create-post');

    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const content = postForm.content.value;

      if (content.trim() === '') {
        alert('Vui lòng nhập nội dung');
      }

      const user = getItemLocalStorage('currentUser');
      const data = {
        createdBy: user.id,
        createdAt: new Date().toISOString(),
        content: content,
        commennts: [],
        authorName: user.fullName,
        isShow: true,
      }

      firebase.firestore().collection('posts').add(data);
      postForm.content.value = ''
    })
  }
}

const style = `
  #create-post {
    text-align: center;
    margin-top: 50px !important;
    margin: auto;
    height: 190px;
    width: 70%;
  }

  #create-post textarea {
    outline: none;
    width: 100%;
    height: 100px;
    border-radius: 6px;
    border: 1px solid #bdbdbd;
    padding: 10px;
    resize: none;
    font-size: 14px;
  }

  #create-post button {
    padding: 15px 20px;
    float: right;
    border-radius: 4px;
    border: none;
    color: white;
    font-size: 14px;
    font-weight: 600;
    background: #EB5130;
    cursor: pointer;
  }
`

customElements.define('create-post', creatPost);


