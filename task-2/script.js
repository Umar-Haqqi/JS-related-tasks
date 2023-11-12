const datass = [
    {
        id: "1",
        name: "Umar",
        age: 30,
    },
    {
        id: "2",
        name: "Hasan",
        age: 19,
    },
    {
        id: "3",
        name: "Hasan",
        age: 22,
    },
];

const addRowBtn = document.querySelector("#addRowBtn");
const tableBody = document.getElementById("tableBody");

addRowBtn.addEventListener("click", function () {
    datass.forEach((data) => {
        // console.log(data);
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const ageCell = document.createElement("td");

        // console.log(data.id);
        idCell.textContent = data.id;
        nameCell.textContent = data.name;
        ageCell.textContent = data.age;

        const removeButtonCell = document.createElement("td");
        const removeButton = document.createElement("button");
        console.log(removeButton);
        removeButton.textContent = "Remove";

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(ageCell);
        row.appendChild(removeButtonCell);
        removeButtonCell.appendChild(removeButton);

        tableBody.appendChild(row);
    });
});
