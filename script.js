
let bookLibrary = document.querySelector('.library');
let popup = document.querySelector('.popup');
let addBookbtn = document.querySelector('.addBook');
let modal = document.querySelector("#myModal");
let close = document.querySelector(".close");
let form = document.querySelector(".formInput");
let myLibrary = JSON.parse(localStorage.getItem('book')) || []; //load localstorage. If empty give empty array




popup.addEventListener('click', function () {
  modal.style.display = "block";
})

close.addEventListener('click', function () {
  modal.style.display = "none";
})

window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
})

function Book(title, author, pages, read) {
  this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    info = function () {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }

}


bookLibrary.addEventListener('click', removeBook);

function removeBook(e) {
  
  let dataEl = document.querySelector("div[data-book]");
  let target = e.target.parentNode;
  let partenTarget = target.getAttribute('data-book');
  
  if (e.target.matches('button')) {
    console.log(partenTarget);
    myLibrary.splice(partenTarget, 1);
    render(myLibrary);
    localStorage.setItem('book', JSON.stringify(myLibrary)); // zet uw array in de localstorage door die te strinifying naar JSON string. */
  }
  return false;
}

bookLibrary.addEventListener('click', toggleCheck);

function toggleCheck(e) {

  let id = e.target.id;
  let existing = localStorage.getItem('book'); // JSON To variable
  existing = existing ? JSON.parse(existing) : {}; // JSON to array 
  //console.log(e.target);
  if (e.target.matches("input")) {
    if (e.target.checked) {
      myLibrary[id].read = true;
      existing[id].read = myLibrary[id].read;// set value checked of array to existing array 
    } else {
      myLibrary[id].read = false;
      existing[id].read = myLibrary[id].read;// set value checked of array to existing array 
    }
  }
  render(myLibrary);
  localStorage.setItem('book', JSON.stringify(existing)); // existing array to localstorage

return false;


}



function render(arr) {
  bookLibrary.innerHTML = arr.map((book, index) => {
    return `
      <div class="books" data-book="${index}">
        <div class="innerbook">
        <h1>${book.title}</h1>
        <h4>${book.author}</h4>
        <p>${book.pages}</p>
        </div>
       
        <label class="labelCheck"for="check">${book.read ? 'Read it!' : 'Need to read it!'}</label>
        <input class="" name="chckbx" id ="${index}" type ="checkbox"${book.read ? 'checked' : ''}/>
        <button class="removebookBtn btn icon">Remove Book</button>
      </div>
    
    `;
  }).join('');
}


addBookbtn.addEventListener('click', addBook);

function addBook(e) {
  e.preventDefault();
  let authorName = (document.querySelector(".author")).value;
  let titleBook = (document.querySelector(".titleBook")).value;
  let nrPages = (document.querySelector(".nrPages")).value;
  let readBook = (document.querySelector(".readBook")).checked;

  let book = new Book(authorName, titleBook, nrPages, readBook);
  myLibrary.push(book);
  form.reset();
  modal.style.display = "none";
  render(myLibrary);
  localStorage.setItem('book', JSON.stringify(myLibrary)); // zet uw array in de localstorage door die te strinifying naar JSON string.


}


window.onload = (event) => {
  render(myLibrary);
}
