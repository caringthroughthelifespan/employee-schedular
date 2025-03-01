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
