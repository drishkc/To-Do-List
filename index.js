// let person = {
//     sDate: '',
//     eDate: '',
//     note: ''
// }
const form = document.getElementById("myForm");
// // let taskList = document.getElementById('taskList');
// // let radiobtn = document.getElementById('radioBtn');
form.addEventListener("submit", save);

function save(event) {
    event.preventDefault();
    const startDate = document.getElementById('sDate').value.trim();
    const endDate = document.getElementById('eDate').value.trim();
    let note = document.getElementById('note').value.trim();
    const msg = document.getElementById('msg');
    
    // console.log(eDate);
    // console.log(startDate);
    // console.log(endDate);
    if (startDate > endDate){
        console.log('starting date cannot be greater than ending date')
        msg.style.display='flex';
        msg.textContent = "Failed to add task";
        msg.style.background='red';
        msg.style.borderBottom='#840101';
        msg.style.color='white';
        msg.style.justifyContent='center';
        setTimeout(() => {
            msg.style.display='none';
        }, 3000);
    }
    else if (!startDate || !endDate || !note) {
        console.log('every field must be filled')
        msg.style.display='flex';
        msg.textContent = "No user Input Found";
        msg.style.background='red';
        msg.style.borderBottom='#840101';
        msg.style.color='white';
        msg.style.justifyContent='center';
        setTimeout(() => {
            msg.style.display='none';
        }, 3000);
    }
    else{
        console.log("new task added")
        msg.style.background= "rgb(1, 159, 1)";
        msg.style.display='flex';
        msg.textContent = "Task Added ✓";
        msg.style.borderBottom= "2px solid rgb(1, 141, 1)";
        msg.style.color='white';
        msg.style.justifyContent='center';
        setTimeout(() => {
            msg.style.display='none';
        }, 3000);
    }

}


// function checkTask(event) {
//     event.preventDefault();
//     if (radiobtn == true) {
//         console.log('hello')
        
//     }
// }