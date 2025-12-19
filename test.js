
        document.addEventListener('DOMContentLoaded', function () {
            const studentTable = new DataTable('.datatable');

            // Load students from localStorage
            const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
            const tbody = document.querySelector('.datatable tbody');

            function populateTable() {
                tbody.innerHTML = storedStudents.map(student => `
            <tr>
                <td><img src="${student.profile || 'https://via.placeholder.com/50'}" alt="profile" class="rounded"></td>
                <td>${student.fullName}</td>
                <td>${student.email}</td>
                <td>${student.age}</td>
                <td>${student.course}</td>
                <td>${student.number}</td>
                <td>${new Date(student.date).toLocaleDateString()}</td>
                <td>
                    <a href="javascript:void(0)" class="btn-yellow btn br-5 b05 fs-16 me-2" ><i class="fa-solid fa-eye"></i></a>
                    <a href="javascript:void(0)" class="btn-blue btn br-5 b05 fs-16 me-2"><i class="fa-solid fa-edit"></i></a>
                    <a href="javascript:void(0)" class="btn-red btn br-5 b05 fs-16"><i class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        `).join('');
            }

            // Add new student
            document.querySelector('#newForm').addEventListener('submit', function (event) {
                event.preventDefault();
                const formData = new FormData(event.target);
                const newStudent = Object.fromEntries(formData.entries());
                newStudent.id = Date.now();
                storedStudents.push(newStudent);
                localStorage.setItem('students', JSON.stringify(storedStudents));
                populateTable();
            });

            populateTable();
            // Reset the form
            form.reset();
        });






        //all global variable declaration
let userInfo;
let user;
let allBData = [];
let logout_btn = document.querySelector(".logout_btn");
let bookingForm = document.querySelector(".Booking-form");
let allBInput = bookingForm.querySelectorAll("input");
let bTextarea = bookingForm.querySelector("textarea");
let bListTBody = document.querySelector(".booking-list");
let bRegBtn = document.querySelector(".b-register-btn");


//check user is login or not

if (sessionStorage.getItem("_au_") == null) {
    window.location = "../index.html";

}


userInfo = JSON.parse(sessionStorage.getItem("_au_"));
// user = userInfo.email.split('@')[0];

//getting data from storage
const fetchData = (key) => {
    if (localStorage.getItem(key) != null) {
        const data = JSON.parse(localStorage.getItem(key));
        return data;
    }
    else {
        return [];
    }

}

allBData = fetchData(user + "_allBData");

//logoutBtn

logout_btn.onclick = () => {


    logout_btn.innerHTML = "please wait...";
    setTimeout(() => {
        logout_btn.innerHTML = "Logout";
        sessionStorage.removeItem("_au_");
        window.location = "../index.html";

    }, 1000)
}

bookingForm.onsubmit = (e) => {

    e.preventDefault();
    if (jQuery('.Booking-form').find('.edit-cus:visible').length > 0) {
        return 0;
    }
    let data = { notice: bTextarea.value }
    for (let el of allBInput) {
        let key = el.name;
        let value = el.value;
        data[key] = value
    }
    allBData.push(data);
    localStorage.setItem(user + "_allBData", JSON.stringify(allBData))
    swal("Good Job!", "Booking Success", 'success');
    bookingForm.reset('');
    // bCloseBtn.click();
    ShowBookingData();

    jQuery('#registration-modal').modal('hide')
}


//booking update coding

const updateBDataFunc = () => {
    let allBEditBtn = bListTBody.querySelectorAll(".edit-btn");
    allBEditBtn.forEach((btn, index) => {

        btn.onclick = () => {
            bRegBtn.click();
            let allBBtn = bookingForm.querySelectorAll("button");
            allBBtn[0].classList.add("d-none");
            allBBtn[1].classList.remove("d-none");
            let obj = allBData[index];
            allBInput[0].value = obj.Name;
            allBInput[1].value = obj.Age;
            allBInput[2].value = obj.location;
            allBInput[3].value = obj.Branch;
            allBInput[4].value = obj.Section;
            allBInput[5].value = obj.MobileNumber;
            allBInput[6].value = obj.email;
            allBInput[7].value = obj.JoiningDate;
            allBInput[8].value = obj.EndingDate;
            bTextarea.value = obj.notice;
            allBBtn[1].onclick = () => {
                let formData = {
                    notice: bTextarea.value,
                    // CreatedAt: new Date(),
                }
                for (let el of allBInput) {
                    let key = el.name;
                    let value = el.value;
                    formData[key] = value
                }
                allBData[index] = formData;
                localStorage.setItem(user + '_allBData', JSON.stringify(allBData));
                ShowBookingData();
                swal("Good Job!", "Booking Success", 'success');
                jQuery('#registration-modal').modal('hide')
                bookingForm.reset('');
            }
        }
    })

}

//show booking data
const ShowBookingData = () => {
    bListTBody.innerHTML = '';
    allBData.forEach((item, index) => {
        // console.log(item, index);
        bListTBody.innerHTML += `
        <tr>
        <td class="text-nowrap">${index + 1}</td>
        <td class="text-nowrap">${item.Name}</td>
        <td class="text-nowrap">${item.Age}</td>
        <td class="text-nowrap">${item.location}</td>
        <td class="text-nowrap">${item.Branch}</td>
        <td class="text-nowrap">${item.Section}</td>
        <td class="text-nowrap">${item.MobileNumber}</td>
        <td class="text-nowrap">${item.email}</td>
        <td class="text-nowrap">${item.JoiningDate}</td>
        <td  class="text-nowrap">${item.EndingDate}</td>
        <td class="text-nowrap">${item.notice}</td>
        <td class="text-nowrap">
        <button class="btn edit-btn btn-primary"><i class="fa fa-edit"></i></button>
        <button class="btn checkin-btn btn-info"><i class="fa fa-check"></i></button>
        <button class="btn del-btn btn-danger"><i class="fa fa-trash"></i></button>
        </td>
        </tr>`

    });
    deleteBDataFunc();
    updateBDataFunc();
   
}
ShowBookingData();


//booking delete coding
function deleteBDataFunc() {
    let allBdelBtn = bListTBody.querySelectorAll(".del-btn");
    allBdelBtn.forEach((btn, index) => {
        btn.onclick = () => {
            allBData.splice(index, 1);
            localStorage.setItem(user + '_allBData', JSON.stringify(allBData));
            ShowBookingData();
        }
    });
}
