class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        this.books.splice(this.books.indexOf(book), 1);
    }

    toggleRead(book) {
        book.toggleRead();
    }
}

const library = new Library();

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const book2 = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, false);
const book3 = new Book('The Two Towers', 'J.R.R. Tolkien', 352, true);
const book4 = new Book('The Return of the King and Stuff', 'J.R.R. Tolkien', 416, false);

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.addBook(book4);


function displayLibrary() {
    const booksDiv = document.querySelector('.books');
    booksDiv.innerHTML = '';

    if (library.books.length === 0) {
        const noBooks = document.createElement('span');
        noBooks.classList.add('book__no-books');
        noBooks.textContent = 'You have no books in your library!';
        booksDiv.appendChild(noBooks);

        const helpText = document.createElement('span');
        helpText.classList.add('book__help-text');
        helpText.textContent = 'Add a book by clicking the button above!';
        booksDiv.appendChild(helpText);
    } else {
        library.books.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');

            const title = document.createElement('span');
            title.classList.add('book__title');
            title.textContent = book.title;
            bookDiv.appendChild(title);

            const author = document.createElement('span');
            author.classList.add('book__author');
            author.textContent = `by ${book.author}`;
            bookDiv.appendChild(author);

            const pages = document.createElement('span');
            pages.classList.add('book__pages');
            pages.textContent = `${book.pages} pages`;
            bookDiv.appendChild(pages);

            const read = document.createElement('button');
            read.classList.add('book__read');
            read.classList.add(book.read ? 'book__read--read' : 'book__read--not-read');
            read.textContent = book.read ? 'Read' : 'Not read yet';
            read.addEventListener('click', () => {
                library.toggleRead(book);
                read.classList.toggle('book__read--read');
                read.classList.toggle('book__read--not-read');
                displayLibrary();
            });
            bookDiv.appendChild(read);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('book__delete');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                library.removeBook(book);
                displayLibrary();
            });
            bookDiv.appendChild(deleteButton);

            booksDiv.appendChild(bookDiv);
        });
    }
}

displayLibrary();