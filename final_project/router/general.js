const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "Unable to register user." });
});


// Get the book list available in the shop
public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const authorName = req.params.author;

    // Get all the keys (book IDs) in the 'books' object
    const bookIds = Object.keys(books);

    // Filter the books array to find books by the given author
    let filtered_books = bookIds.reduce((result, id) => {
        if (books[id].author === authorName) {
            result.push(books[id]);
        }
        return result;
    }, []);

    res.send(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;

    const bookKeys = Object.keys(books);

    // Filter the books array to find the book with the given title
    let filtered_books = bookKeys.reduce((result, id) => {
        if (books[id].title.toLowerCase() === title.toLowerCase()) {
            result.push(books[id]);
        }
        return result;
    }, []);

    if (filtered_books.length > 0) {
        res.send(filtered_books[0]);
    } else {
        res.status(404).send(`Book with title "${title}" not found.`);
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
        const reviews = book.reviews;
        return res.json(reviews);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
