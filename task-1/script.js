// references
const modalTable = document.querySelector('#modalTable')
const modalTableBody = document.querySelector('#modalTableBody')
const selectAllCheckboxes = document.querySelector('#selectAllCheckboxes')


// select all checkboxes by clicking by checking one checkbox
selectAllCheckboxes.addEventListener('change', () => {

    // By keeping the selection of modalTableBodyCheckboxes inside the event listener, you ensure that the selection is made at the moment when the event occurs, and the checkboxes are available in the DOM.
    const modalTableBodyCheckboxes = document.querySelectorAll("#modalTableBody input[type='checkbox']")
    console.log(modalTableBodyCheckboxes);

    modalTableBodyCheckboxes.forEach((checkbox) => {

        // setting the checked property of an individual checkbox element to the same value as the checked property of the selectAllCheckboxes checkbox
        checkbox.checked = selectAllCheckboxes.checked
    })


    // Adding to feature to uncheck selectAll if any Checkbox get unchecked
    const individualCheckboxes = document.querySelectorAll("#modalTableBody input[type='checkbox']");
    console.log("here",individualCheckboxes);

    individualCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            
            // Check the state of all individual checkboxes
            const allChecked = Array.from(individualCheckboxes).every((cb) => cb.checked);
            // here Array.from(individualCheckboxes) converts the individualCheckboxes NodeList into an array so that it can be used with the every method.

            // Update the state of the selectAll Checkbox based on the individual checkboxes
            selectAllCheckboxes.checked = allChecked;
        });
    });
})


// fetching json data from file
fetch('./data.json')
    .then(response => response.json())
    .then((data) => {
        console.log(data)

        data.forEach(val => {

            const row = document.createElement('tr')

            // creating a checkbox
            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkboxCell.appendChild(checkbox);

            const stockCodeCell = document.createElement('td')
            const descriptionCell = document.createElement('td')
            const uomCell = document.createElement('td')
            const issueQtyCell = document.createElement('td')
            const remarksCell = document.createElement('td')

            stockCodeCell.textContent = val["Stock code"]
            descriptionCell.textContent = val["Description"]
            uomCell.textContent = val["UOM"]
            issueQtyCell.textContent = val["Issue Qty"]
            remarksCell.textContent = val["Remarks"]

            row.appendChild(checkboxCell);
            row.appendChild(stockCodeCell)
            row.appendChild(descriptionCell)
            row.appendChild(uomCell)
            row.appendChild(issueQtyCell)
            row.appendChild(remarksCell)

            modalTableBody.appendChild(row)
        });
    })