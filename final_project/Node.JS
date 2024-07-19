const axios = require('axios');

async function getBooks() {
    try {
        await axios.get('http://localhost:5000/');
        console.log('All done');
    } catch (error) {
        console.error('Error fetching the book list:', error);
    }
}

getBooks();



// Function to get book details based on ISBN
function getBookDetails(isbn) {
    // Replace 'API_URL' with the actual URL of the book API
    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(() => {
            console.log('All done');
        })
        .catch(error => {
            console.error('Error fetching book details:', error.response ? error.response.data : error.message);
        });
}

// Example usage
const isbn = '1'; // Replace with the ISBN you want to look up
getBookDetails(isbn);

// Function using Promises
function getBooksByAuthor(authorName) {
    axios.get(`http://localhost:5000/author/${authorName}`)
        .then(response => {
            console.log('Books by author:', response.data);
            console.log('All done');
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
}
getBooksByAuthor('Chinua Achebe');

// Function using async-await
async function getBookByTitleAsync(title) {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        console.log('Book details:', response.data);
        console.log('All done');
    } catch (error) {
        console.error('Error fetching book:', error);
    }
}
getBookByTitleAsync('The Epic Of Gilgamesh');