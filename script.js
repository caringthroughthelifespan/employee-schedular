// Show an alert when the page loads
window.onload = function() {
    alert("Welcome to the Employee Scheduler!");
};

// Function to handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0]; // Get the uploaded file
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result; // Read file content
        console.log("Uploaded File Content:\n", content);
        
        // Here, you can process the CSV data and update the calendar
    };
    
    reader.readAsText(file); // Read file as text
}

// Add event listener to the file input
document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
        fileInput.addEventListener("change", handleFileUpload);
    }
});
document.addEventListener("DOMContentLoaded", function() {
    // Get tab elements
    const employeeTab = document.getElementById("employee-tab");
    const clientTab = document.getElementById("client-tab");
    const createModifyTab = document.getElementById("create-modify-tab");

    // Get content elements
    const employeeContent = document.getElementById("employee-content");
    const clientContent = document.getElementById("client-content");
    const createModifyContent = document.getElementById("create-modify-content");

    // Function to set active tab and content
    function setActiveTab(tab, content) {
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));

        // Add active class to the clicked tab and its content
        tab.classList.add('active');
        content.classList.add('active');
    }

    // Set initial active tab (Employee Schedules by default)
    setActiveTab(employeeTab, employeeContent);

    // Add event listeners to the tabs
    employeeTab.addEventListener("click", function() {
        setActiveTab(employeeTab, employeeContent);
    });

    clientTab.addEventListener("click", function() {
        setActiveTab(clientTab, clientContent);
    });

    createModifyTab.addEventListener("click", function() {
        setActiveTab(createModifyTab, createModifyContent);
    });
});
