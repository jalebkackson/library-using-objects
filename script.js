const container = document.getElementById("books");
const form = document.getElementById("add-book-form");
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("open-dialog");

const myLibrary = [];

// constructor function for books
function Book(author, title, pages, hasBeenRead) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.hasBeenRead = hasBeenRead;
}

// adds books to myLibrary
function addBookToLibrary(author, title, pages, hasBeenRead) {
  myLibrary.push(new Book(author, title, pages, hasBeenRead));
}

// seed data for testing
addBookToLibrary("JRR Tolkien", "Lord of the Rings", 672, false);
addBookToLibrary("H.A. Rey", "Curious George", 21, true);

newBookBtn.addEventListener("click", () => dialog.showModal());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //gather inputs from DOM
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const pages = Number(document.getElementById("book-pages").value);
  const hasBeenRead = document.getElementById("book-read").checked;

  addBookToLibrary(author, title, pages, hasBeenRead);
  displayBooks();
  form.reset();
  dialog.close();
});

// helper function for adding elements to cards
function createText(tag, text, className) {
  const el = document.createElement(tag);
  el.textContent = text;
  if (className) el.classList.add(className);
  return el;
}

// displays the books to the dom
function displayBooks() {
  container.innerHTML = "";
  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book");

    const deleteBtn = createText("button", "X", "delete-button");
    deleteBtn.addEventListener("click", () => deleteBook(book.id));

    card.append(
      createText("h3", book.title, "title"),
      createText("p", book.author, "author"),
      createText("p", `${book.pages} pages`, "pages"),
      deleteBtn,
    );
    card.dataset.id = book.id;
    container.appendChild(card);
  });
}

function deleteBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
  displayBooks();
}

displayBooks();
