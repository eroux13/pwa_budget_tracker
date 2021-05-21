const { response } = require("express");

const request = indexedDB.open("budgetDB", 1);

request.onupgradeneeded = function(event) {
    console.log(event);
    const db = request.result;

    if(!db.objectStoreNames.contains("pending")) {
        db.createObjectStore("pending", {autoIncrement: true});
    }
};

request.onsuccess = function(event){
    if (navigator.onLine){
        checkDB();
    }
};

request.onerror = function(event){
    console.log(event);
};

function checkDB() {
    const db = request.result;
    var transaction = db.transaction(["pending"], "readwrite");
    var store = transaction.objectStore("pending");
    var getAll = store.getAll();

    getAll.onsuccess = () => {
        if (getAll.result.length > 0) {
            fetch ("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: `application/json, text/plain, */*`,
                    "Content-Type": `application/json`
                }
            })
            .then(response => response.json())
            .then(() => {
                transaction = db.transaction(["pending"], "readwrite")
                store = transaction.objectStore("pending")
                store.clear()
            })
        }
    }
};

function saveRecord(record) {
    const db = request.result;
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    store.add(record);
}

window.addEventListener("onLine", checkDB);