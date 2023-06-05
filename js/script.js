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
            deleteButton.classList.add('cancel-button');
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

/* when the add book button is clicked, make the modal visible */
const addBookButton = document.querySelector('.header__button');
addBookButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('modal--visible');
});

/* when the modal form is submitted, add the book to the library and display the library */
const modalForm = document.querySelector('.modal__form');
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('.modal__form-title').value;
    const author = document.querySelector('.modal__form-author').value;
    const pages = document.querySelector('.modal__form-pages').value;
    const read = document.querySelector('.modal__form-read-input').checked;

    const modalFormError = document.querySelector('.modal__form-error');

    /* if title and author in library, then add a span after the h2 saying that the book already exists */
    if (library.books.some(book => book.title === title && book.author === author)) {
        if (!modalFormError) {
            const modalFormTitle = document.querySelector('.modal__form-title');

            const error = document.createElement('span');
            error.classList.add('modal__form-error');
            error.textContent = 'This book already exists in your library!';
            modalFormTitle.parentNode.insertBefore(error, modalFormTitle.nextSibling);
        }
        return;
    }

    const book = new Book(title, author, pages, read);
    library.addBook(book);

    if (modalFormError) {
        modalFormError.remove();
    }

    modalForm.reset();
    displayLibrary();

    modal.classList.toggle('modal--visible');
});

const modalCancelButton = document.querySelector('.modal__form-cancel');
modalCancelButton.addEventListener('click', () => {
    modal.classList.toggle('modal--visible');

    const modalFormError = document.querySelector('.modal__form-error');
    if (modalFormError) {
        modalFormError.remove();
    }

    modalForm.reset();
});

/* when the modal is clicked, make it invisible */
const modal = document.querySelector('.modal');
modal.addEventListener('click', () => {
    modal.classList.toggle('modal--visible');
    modalForm.reset();
});

/* when the modal content is clicked, don't make the modal invisible */
const modalContent = document.querySelector('.modal__content');
modalContent.addEventListener('click', (e) => {
    e.stopPropagation();
});

displayLibrary();
