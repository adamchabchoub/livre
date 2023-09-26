
const books = [];

// add
function addBook(book) {
    books.push(book);
    displayBooks();
}

//edit
function editBook(id, bookData) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books[index] = { ...books[index], ...bookData };
        displayBooks();
    }
}
// add and edit eventlistener
const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const price = document.getElementById('price').value;

    const editId = addBookForm.getAttribute('data-edit-id');

    if (editId) {
        // Editing an existing book
        editBook(editId, { title, author, price });
        addBookForm.removeAttribute('data-edit-id'); // Clear the edit mode
    } else {
        // Adding a new book
        const id = Date.now().toString();
        addBook({ id, title, author, price });
    }

    addBookForm.reset();
});


// delete
function deleteBook(id) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        displayBooks();
    }
}


// edit event listener
function handleEditButtonClick(book) {
    const titleField = document.getElementById('title');
    const authorField = document.getElementById('author');
    const priceField = document.getElementById('price');

    // Pre-fill the form fields with the selected book's data
    titleField.value = book.title;
    authorField.value = book.author;
    priceField.value = book.price;

    // Add a data attribute to the form to store the book's ID
    addBookForm.setAttribute('data-edit-id', book.id);
}


// Function to display books
function displayBooks() {
    const bookList = document.getElementById('book-items');
    bookList.innerHTML = '';

    for (const book of books) {
        const listItem = document.createElement('tr');
        listItem.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.price}</td>
        <td>
            <button class="edit-button" data-id="${book.id}">Edit</button>
            <button class="delete-button" data-id="${book.id}">Delete</button>
        </td>
    `;
        listItem.querySelector('.edit-button').addEventListener('click', () => {
            handleEditButtonClick(book);
        });

        listItem.querySelector('.delete-button').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this book?')) {
                deleteBook(book.id);
            }
        });

        bookList.appendChild(listItem);
    }
}


displayBooks();
