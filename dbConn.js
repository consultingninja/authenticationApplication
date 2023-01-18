const {MongoClient} = require('mongodb');

const fireConnection =()=>{
    const url = 'mongodb://0.0.0.0:27017';
    const client = new MongoClient(url);
    const dbName = 'users';
    const collName = 'AllUsers';
    const db  = client.db(dbName);
    const collection = db.collection(collName);

    if(db && collection) console.log("DB and Collection good to go!");

    return{
        DB:db,
        Coll:collection
    }
}

module.exports={
    ...fireConnection()
}