import { getDataFromDocs, getDataFromDoc } from "../components/utils.js";

class listPost extends HTMLElement {
  constructor() {
    super();
    this.sdRoot = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const res = await firebase
      .firestore()
      .collection("posts")
      .where("isShow", "==", true)
      .get();
    this.listenCollectionChange();
    const listPost = getDataFromDocs(res);
    let html = "";

    listPost.forEach((element) => {
      html += `
        <post-item
          time='${element.createdAt}'
          author='${element.authorName}'
          content='${element.content}'
        ></post-item>
      `;
    });
    // console.log(listPost);

    this.sdRoot.innerHTML = `
    <style>${style}</style>
    <div class='list-posts'>
      ${html}
    </div>
    `;
  }

  listenCollectionChange() {
    let firstRun = true;
    firebase
      .firestore()
      .collection("posts")
      .where("isShow", "==", true)
      .onSnapshot((snapShot) => {
        // Phuc vu cho lan chay thu 2
        if (firstRun) {
          firstRun = false;
          return;
        }
        console.log("snapshot ", snapShot.docChanges());

        // Theo dõi những bài mới được tạo
        const docChange = snapShot.docChanges();
        for (const oneChange of docChange) {
          if (oneChange.type === "added") {
            this.appendPostItem(getDataFromDoc(oneChange.doc));
          }
        }
      });
  }

  // Những bài mới tạo sẽ được xếp lên trên đầu
  appendPostItem(data) {
    const postItem = document.createElement("post-item");
    postItem.setAttribute("time", data.createdAt);
    postItem.setAttribute("author", data.authorName);
    postItem.setAttribute("content", data.content);

    const parent = this.sdRoot.querySelector(".list-posts");
    parent.insertBefore(postItem, parent.firstChild);
  }
}

const style = `
  .list-posts {
    width: 80%;
    margin: auto;
  }
`;

customElements.define("list-post", listPost);
