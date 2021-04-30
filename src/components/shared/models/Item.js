class Item {
    constructor(data = {}) {
        this.id = null;
        this.userId = null;
        this.description = null;
        this.title = null;
        this.tagsItem = null;
        Object.assign(this, data);
    }
}
export default Item;