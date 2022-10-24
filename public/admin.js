
// Your Code Here
async function main () {
    //pulls the list of books from the listBooks page
    let response = await fetch ('http://localhost:3001/listBooks') 
    let books = await response.json() 

    books.forEach(renderBook)
}

function renderBook(book) {
    let root = document.querySelector('#root')
    //creates a list of books.  
    let li = document.createElement('li')
    li.textContent = book.title
    //allows you to input the amount of books
    let quantityInput = document.createElement('input')
    quantityInput.value = book.quantity
    //creates a save button
    let saveButton = document.createElement('button')
    saveButton.textContent = 'Save'
    //allows save button to perform a patch function to update quantities
    saveButton.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value

            })
        })
    })

    li.append(quantityInput, saveButton)

    root.append(li)
}

main();