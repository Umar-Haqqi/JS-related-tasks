const tableBody = document.querySelector('#tableBody');
const addRowButton = document.querySelector('#addRow');
let deleteRowButton = document.getElementById('delRow');

let rowIndex = 1;
const tableIndex = document.querySelector('#tableIndex');
tableIndex.textContent = rowIndex;

addRowButton.addEventListener('click', () => {
    rowIndex++;

    const newRow = document.createElement('tr');

    const newColIndex = document.createElement('td');
    const newColFname = document.createElement('td');
    const newColLname = document.createElement('td');
    const newColEmail = document.createElement('td');
    const newColAddress = document.createElement('td');
    const newColAction = document.createElement('td');

    newColIndex.innerHTML = rowIndex;
    newColFname.innerHTML = `<input type="text" placeholder="First name">`;
    newColLname.innerHTML = `<input type="text" placeholder="Last name">`;
    newColEmail.innerHTML = `<input type="email" placeholder="Email Address">`;
    newColAddress.innerHTML = `<input type="text" placeholder="Your Location">`;
    newColAction.innerHTML = `
        <button class="newRowAddButton btn btn-primary">+</button>
        <button class="newRowDelButton btn btn-primary">-</button>
    `;

    newRow.appendChild(newColIndex);
    newRow.appendChild(newColFname);
    newRow.appendChild(newColLname);
    newRow.appendChild(newColEmail);
    newRow.appendChild(newColAddress);
    newRow.appendChild(newColAction);

    tableBody.appendChild(newRow);
});


tableBody.addEventListener('click', (event) => {
    const firstRowDeleteBtn = event.target;

    if (firstRowDeleteBtn.classList.contains('delRow')) {
        const rowToDelete = firstRowDeleteBtn.closest('tr');
        if (rowToDelete) {
            tableBody.removeChild(rowToDelete);
        }
    }
});

tableBody.addEventListener('click', (event) => {
    const curentRowDeleteBtn = event.target;

    if (curentRowDeleteBtn.classList.contains('newRowDelButton')) {
        const rowToDelete = curentRowDeleteBtn.closest('tr');
        if (rowToDelete) {
            tableBody.removeChild(rowToDelete);
        }
    }
});


tableBody.addEventListener('click', (event) => {
    const targetButton = event.target;

    if (targetButton.classList.contains('newRowAddButton')) {
        const rowToAdd = targetButton.closest('tr');
        if (rowToAdd) {
            const newRow = document.createElement('tr');

            const newColIndex = document.createElement('td');
            const newColFname = document.createElement('td');
            const newColLname = document.createElement('td');
            const newColEmail = document.createElement('td');
            const newColAddress = document.createElement('td');
            const newColAction = document.createElement('td');

            // Increment rowIndex before using it
            newColIndex.innerHTML = ++rowIndex;
            newColFname.innerHTML = `<input type="text" placeholder="First name">`;
            newColLname.innerHTML = `<input type="text" placeholder="Last name">`;
            newColEmail.innerHTML = `<input type="email" placeholder="Email Address">`;
            newColAddress.innerHTML = `<input type="text" placeholder="Your Location">`;
            newColAction.innerHTML = `
                <button class="newRowAddButton btn btn-primary">+</button>
                <button class="newRowDelButton btn btn-primary">-</button>
            `;

            newRow.appendChild(newColIndex);
            newRow.appendChild(newColFname);
            newRow.appendChild(newColLname);
            newRow.appendChild(newColEmail);
            newRow.appendChild(newColAddress);
            newRow.appendChild(newColAction);

            // Insert the new row after the row containing the clicked button
            rowToAdd.parentNode.insertBefore(newRow, rowToAdd.nextSibling);
        }
    }
});

const saveButton = document.querySelector('.save-btn');

saveButton.addEventListener('click', () => {
    const rows = document.querySelectorAll('#tableBody tr');
    const rowDataArray = [];

    rows.forEach((row) => {
        const rowData = {
            index: row.querySelector('td').textContent,
            firstName: getValueFromInput(row, 'First name'),
            lastName: getValueFromInput(row, 'Last name'),
            email: getValueFromInput(row, 'Email Address'),
            location: getValueFromInput(row, 'Your Location'),
        };

        rowDataArray.push(rowData);
    });

    const jsonData = JSON.stringify(rowDataArray, null, 2);
    console.log(jsonData);
});

function getValueFromInput(row, placeholder) {
    const input = row.querySelector(`input[placeholder="${placeholder}"]`);
    return input ? input.value : '';
}