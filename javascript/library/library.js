const myLibrary = [];
const shelf = document.querySelector(".shelf>tbody"); 
const dialog = document.querySelector("dialog");
const modalButton = document.querySelector(".addBook");
const submitButton = document.querySelector(".submit");

// function Book(author, title, pageCount, readStatus) {
//     this.author = String(author);
//     this.title = String(title);
//     this.pageCount = Number(pageCount);
//     this.readStatus = String(readStatus);

//     this.readBook = function() {
//         this.readStatus = 'Read';
//     };
// }

class Book {
    constructor(author, title, pageCount, readStatus) {
        this._author = String(author);
        this._title = String(title);
        this._pageCount = Number(pageCount);
        this._readStatus = String(readStatus); 
    };
   
    get author() {
        return this._author;
    }
    
    get title() {
        return this._title;
    }
    
    get pageCount() {
        return this._pageCount;
    }
    
    get readStatus() {
        return this._readStatus;
    }
    
    read() {
        this._readStatus = "Read";
    }

}

function addBook() {
    const inputTitle = document.querySelector("#title");
    const inputAuthor = document.querySelector("#author");
    const inputPages = document.querySelector("#pages");
    const inputRead = document.querySelector("input[name='read-status']:checked");
    const warning = document.querySelector(".warning");
    if (!inputTitle.value || !inputAuthor.value || !inputPages.value || !inputRead) {
        warning.textContent = 'Fill up all fields!';
        dialog.showModal();
    } else {
        // let book = new Book();
        // book.author = inputAuthor.value;
        // book.title = inputTitle.value;
        // book.pageCount = inputPages.value;
        // book.readStatus = inputRead.value;
        let book = new Book(inputAuthor.value, inputTitle.value, inputPages.value, inputRead.value);
        inputTitle.value = '';
        inputAuthor.value = '';
        inputPages.value = '';
        inputRead.checked = false;
        warning.textContent = '';
        return book
    }
}

function clearTable() {
    let row = document.querySelectorAll(".book");
    row.forEach((book) => book.remove());
}

function updateScreen() {
    clearTable();
    myLibrary.forEach((book) => {
        let newRow = document.createElement("tr");
        newRow.classList.add("book");
        // for (var key in book) {
        //     if (typeof book[key] != 'function') {
        //         var td = document.createElement("td");
        //         td.innerHTML = book[key];
        //         newRow.appendChild(td);
        //     }
        // }
        
        var td = document.createElement("td");
        td.innerHTML = book.title;
        newRow.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = book.author;
        newRow.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = book.pageCount;
        newRow.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = book.readStatus;
        newRow.appendChild(td);

        var td = document.createElement("td");
        let readButton = document.createElement("button");
        readButton.addEventListener("click", () => {
            // book.readBook();
            book.read();
            updateScreen();
        }); 
        readButton.innerHTML = 'Read Book';
        td.appendChild(readButton);
        newRow.appendChild(td);

        var td = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = 'Remove Book';
        deleteButton.addEventListener("click", () => {
            const index = myLibrary.indexOf(book);
            myLibrary.splice(index, 1);
            newRow.remove();
        });
        td.appendChild(deleteButton);
        newRow.appendChild(td);
        shelf.appendChild(newRow);
    })
}

modalButton.addEventListener("click", () => {
    dialog.showModal();
})

submitButton.addEventListener("click", (e) => {
    dialog.close()
    let book = addBook();
    if (book) {
        myLibrary.push(book)
    }
    e.preventDefault();
    updateScreen()
})

