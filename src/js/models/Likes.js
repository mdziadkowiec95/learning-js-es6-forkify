export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);
  }

  isLiked(id) {
    // if it finds, it returns ID, otherwise it returns -1;
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }
}