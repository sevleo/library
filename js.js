// Global variables
const myLibrary = [];
let bookCount = 0;

// Execution
createTestData();
loadBooks();
addModalDialogEventListeners();

// Book constructor
function Book(title, author, has_read, displayed, id) {
    this.title = title;
    this.author = author;
    this.has_read = has_read;
    this.displayed = displayed;
    this.id = id;
}

// Display updated books' library
function loadBooks() {
    const bookList = document.querySelector('.book-list');
    const dialogRemoveBook = document.querySelector("dialog.confirm-delete");
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        if (book.displayed === false) {
            book.displayed = true;

            // Update DOM
            const bookItem = document.createElement("div");
            bookItem.classList.add('book');
            bookItem.setAttribute('data-index', book.id);

            const bookItemTitle = document.createElement("p");
            bookItemTitle.textContent = `Title: ${book.title}`;
            bookItem.append(bookItemTitle);

            const bookItemAuthor = document.createElement("p");
            bookItemAuthor.textContent = `Author: ${book.author}`;
            bookItem.append(bookItemAuthor);

            const bookItemHasRead = document.createElement("p");
            bookItemHasRead.textContent = `Has been read: ${book.has_read}`;
            bookItem.append(bookItemHasRead);

            const bookItemReadToggleLabel = document.createElement("label");
            bookItemReadToggleLabel.classList.add('switch');
            bookItem.append(bookItemReadToggleLabel);

            const bookItemReadToggleInput = document.createElement("input");
            bookItemReadToggleInput.setAttribute('type', 'checkbox');
            bookItemReadToggleInput.checked = book.has_read;
            bookItemReadToggleInput.addEventListener("click", () => {
                book.has_read = !book.has_read;
                bookItemHasRead.textContent  = `Has been read: ${book.has_read}`;

            });
            bookItemReadToggleLabel.append(bookItemReadToggleInput);

            const bookItemReadToggleSpan = document.createElement("span");
            bookItemReadToggleSpan.classList.add("slider", "round");
            bookItemReadToggleLabel.append(bookItemReadToggleSpan);

            const bookItemRemoveButton = document.createElement("button");
            bookItemRemoveButton.textContent = "Remove book";
            bookItemRemoveButton.addEventListener("click", (event) => {
                openRemoveDialog(event.target.parentNode.dataset.index);
            })
            bookItem.append(bookItemRemoveButton);
        
            bookList.append(bookItem);

            function openRemoveDialog(bookIndex) {
                dialogRemoveBook.dataset.bookId = bookIndex;
                dialogRemoveBook.showModal();
                console.log(myLibrary);
            }
        }
    }
}

// Define event listeners around modal dialog window
function addModalDialogEventListeners() {

    // Add book dialog
    const dialogAddBook = document.querySelector("dialog.add-book");
    const dialogAddBookOpenButton = document.querySelector('.add-book > button.dialog');
    const dialogAddBookCloseButton = document.querySelector('dialog.add-book > form > button.close');
    const dialogAddBookForm = document.querySelector("dialog > form");
    
    dialogAddBookOpenButton.addEventListener("click", () => {
        dialogAddBook.showModal();
    });
    
    dialogAddBookCloseButton.addEventListener("click", (event) => {
        event.preventDefault();
        dialogAddBookForm.reset();
        dialogAddBook.close();
    });
    
    dialogAddBookForm.addEventListener("submit", (event) => {
        event.preventDefault();
        addBook(createBookObject());
        dialogAddBookForm.reset();
        dialogAddBook.close();
    });

    // Remove book dialog
    const dialogRemoveBook = document.querySelector("dialog.confirm-delete");
    const dialogRemoveBookConfirmButton = document.querySelector("dialog.confirm-delete > form > button.confirm");
    const dialogRemoveBookCloseButton = document.querySelector("dialog.confirm-delete > form > button.close");

    dialogRemoveBookConfirmButton.addEventListener("click", (event) => {
        event.preventDefault();
        removeBook(dialogRemoveBookConfirmButton.form.parentNode.dataset.bookId);
        dialogRemoveBook.close();
    })

    dialogRemoveBookCloseButton.addEventListener("click", (event) => {
        event.preventDefault();
        dialogRemoveBook.close();
    })
}

// Add new book
function addBook(book) {
    myLibrary.push(book);
    loadBooks();
}

// Collect book properties from DOM and create object
function createBookObject() {
    const bookTitle = document.querySelector("dialog.add-book > form input#title");
    const bookAuthor = document.querySelector("dialog.add-book > form input#author");
    const bookRead = document.querySelector("dialog.add-book > form input#read");
    const book = new Book(bookTitle.value, bookAuthor.value, bookRead.checked, false, countBooks());
    return book;
}

function removeBook(bookId) {
    const indexToDelete = myLibrary.findIndex(book => parseInt(book.id) === parseInt(bookId));
    if (indexToDelete !== -1) {
        myLibrary.splice(indexToDelete, 1);
        console.log(myLibrary);
    }
}

function countBooks() {
    return bookCount = bookCount + 1;
}

// Test stuff
function createTestData() {
    const book1 = new Book("The Hobbit", "J.R.R. Tolkien", false, false, countBooks());
    const book2 = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", true, false, countBooks());
    const book3 = new Book("Meditations", "Marcus Aurelius", true, false, countBooks());
    myLibrary.push(book1);
    myLibrary.push(book2);
    myLibrary.push(book3);
}