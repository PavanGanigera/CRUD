// Registration Form Submission
document.getElementById('regForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form inputs
    const fullName = document.getElementById('adminName').value.trim();
    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('AdminPassword').value.trim();

    // Validate inputs
    if (fullName !== "" && email !== "" && password !== "") {
        // Store user details in local storage
        const userDetails = {
            fullName,
            email,
            password
        };
        localStorage.setItem(email, JSON.stringify(userDetails)); // Email as key
        alert("Registration Successful!");
        // swal("Good job!", "Registration Successful", "success");
        window.location.href = '/index.html'; // Redirect to login page
    } else {
        // alert("Please fill in all fields correctly.");
        swal("Oops..!", "Please fill in all fields correctly", "info");
    }
});

const searchInput = document.getElementById('students-search');

searchInput.addEventListener('keyup', function () {
    $('.datatable').DataTable().search(this.value).draw();
});





