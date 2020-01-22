class ExampleDao {
    constructor(db){
        this._db = db;
    }

    db() {
        return this._db;
    }

    list() {
        return [];
    }

    store(evento) {
        return [];
    }

    show(id) {
        return [];
    }

    update(id){
        return [];
    }

    destroy(id) {
        return [];
    }
}

module.exports = ExampleDao;