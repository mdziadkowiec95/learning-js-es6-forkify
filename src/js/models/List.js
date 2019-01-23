import uniqid from 'uniqid';
console.log(uniqid());

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    }

    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex(item => item.id === id);
    // [2, 4, 8].splice(1, 2)  ----> return [4, 8], original arr is [2]  <--- zmienia org arr
    // [2, 4, 8].slice(1, 2)  ----> return 4, original arr is [2, 4, 8] <--- nie zmienia org arr
    this.items.splice(index, 1);
  }

  updateCount(id, newCount) {
    this.items.find(item => item.id === id).count = newCount;
  }
}