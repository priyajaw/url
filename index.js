
let myLeads = [];
let inputBtn = document.getElementById('input-btn');
let inputText = document.getElementById('input-el');
let inputUl = document.getElementById('input-ul');
let deleteBtn = document.getElementById('delete-btn');
let tabBtn = document.getElementById('tab-btn');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}

tabBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads);
    })
})
function renderLeads(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++){
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
}
    inputUl.innerHTML = listItems;
}
deleteBtn.addEventListener('click', function () {
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
})
inputBtn.addEventListener("click", function () {
    myLeads.push(inputText.value);
    inputText.value = "";
    console.log(myLeads);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  
})


