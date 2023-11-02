// references
const modalTable = document.querySelector('#modalTable')
const modalTableBody = document.querySelector('#modalTableBody')
const selectAllCheckboxes = document.querySelector('#selectAllCheckboxes')
const AddDataInTable = document.querySelector('#AddDataToTable')
console.log(AddDataInTable);



// select all checkboxes by clicking by checking one checkbox
selectAllCheckboxes.addEventListener('change', () => {
    const modalTableBodyCheckboxes = document.querySelectorAll("#modalTableBody input[type='checkbox']")
    modalTableBodyCheckboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckboxes.checked
    })

    // Adding to feature to uncheck selectAll if any Checkbox get unchecked
    const individualCheckboxes = document.querySelectorAll("#modalTableBody input[type='checkbox']");
    individualCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const allChecked = Array.from(individualCheckboxes).every((cb) => cb.checked);
            selectAllCheckboxes.checked = allChecked;
        });
    });
})


// Function to add selected data to the TableOnScreen
function addDataToTable() {
    const modalTableBodyCheckboxes = document.querySelectorAll("#modalTableBody input[type='checkbox']");
    const tableOnScreenBody = document.querySelector("#TableOnScreenbody");
    const rowsToRemove = [];

    modalTableBodyCheckboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const modalTableRow = modalTableBody.children[index];
            const newRow = document.createElement('tr');

            // Create an index cell with sequential numbering
            const indexCell = document.createElement('td');
            indexCell.textContent = tableOnScreenBody.children.length + 1;
            newRow.appendChild(indexCell);

            // Iterate through the cells and copy data
            for (let i = 1; i < modalTableRow.cells.length; i++) {
                const cell = modalTableRow.cells[i].cloneNode(true);
                newRow.appendChild(cell);
            }

            // Add an additional cell for the "Action" column in TableOnScreen
            const actionCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                newRow.remove();
                // Move the removed row back to modalTableBody
                modalTableBody.appendChild(modalTableRow);
            });
            actionCell.appendChild(removeButton);
            newRow.appendChild(actionCell);

            tableOnScreenBody.appendChild(newRow);

            // Add the row to the list to be removed
            rowsToRemove.push(modalTableRow);
        }
    });

    // Remove the selected rows from modalTableBody
    rowsToRemove.forEach(row => row.remove());
}


// Event listener for the "Add data in table" button
AddDataInTable.addEventListener('click', addDataToTable);




// fetching json data from file
fetch('./data.json')
    .then(response => response.json())
    .then((data) => {
        data.forEach(val => {
            const row = document.createElement('tr')

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