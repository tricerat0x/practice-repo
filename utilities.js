function getRandomPercentage(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function resetTable(tableId) {
    const table = document.getElementById(tableId);
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

export { getRandomPercentage, resetTable };
