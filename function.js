const { MongoClient } = require('mongodb')

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://hanifmaliki:DAUULmjKAEEtoZN5@hanifcluster.uwjchy9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db("hanifdb");
const fav_books = database.collection("fav_books");

async function getFavBooks() {
    try {
        await client.connect();

        const query = {};
        const options = {
            sort: { title: 1 },
            projection: { _id: 0, id: 1, title: 1, link: 1, authors: 1, rating: 1 },
        };

        const cursor = fav_books.find(query, options);

        const result = await cursor.toArray();

        return result
    } finally {
        await client.close();
    }
}

async function insertFavBooks(inputs) {
    try {
        await client.connect();

        const doc = {
            id: inputs.id,
            title: inputs.title,
            link: inputs.link,
            authors: inputs.authors,
            rating: inputs.rating
        }
        const result = await fav_books.insertOne(doc);

        const response = { message: `A document was inserted with the _id: ${result.insertedId}` }

        return response
    } finally {
        await client.close();
    }
}

async function deleteFavBooks(input) {
    try {
        await client.connect();

        const query = { id: input.id };
        const result = await fav_books.deleteOne(query);

        if (result.deletedCount === 1) {
            return { message: "Successfully deleted one document." }
        }

        return { message: "No documents matched the query. Deleted 0 documents." }
    } finally {
        await client.close();
    }
}

module.exports = {
    getFavBooks: getFavBooks,
    insertFavBooks: insertFavBooks,
    deleteFavBooks: deleteFavBooks,
};