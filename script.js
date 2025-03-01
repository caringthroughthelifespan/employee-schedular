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

// Function to handle file uploads
function handleFileUpload() {
    const clientRequestFile = document.getElementById("client-request").files[0];
    const staffAvailabilityFile = document.getElementById("staff-availability").files[0];
    
    if (!clientRequestFile || !staffAvailabilityFile) {
        alert("Please select both files before uploading.");
        return;
    }

    // Display loading status
    document.getElementById("file-status").innerText = "Uploading files...";

    // Process Client Request File (CSV or XLSX)
    processFile(clientRequestFile, "client-request")
        .then(clientData => {
            console.log("Client Request Data:", clientData); // Here you can handle the parsed data
            // Optionally, display a success message
            document.getElementById("file-status").innerText = "Files uploaded successfully!";
        })
        .catch(error => {
            console.error("Error processing client request file:", error);
            document.getElementById("file-status").innerText = "Error processing client request file.";
        });

    // Process Staff Availability File (CSV or XLSX)
    processFile(staffAvailabilityFile, "staff-availability")
        .then(staffData => {
            console.log("Staff Availability Data:", staffData); // Here you can handle the parsed data
        })
        .catch(error => {
            console.error("Error processing staff availability file:", error);
            document.getElementById("file-status").innerText = "Error processing staff availability file.";
        });
}

// Function to read and parse CSV or XLSX files
function processFile(file, fileType) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const fileContent = event.target.result;
            
            if (fileType === "client-request") {
                parseClientRequest(fileContent)
                    .then(resolve)
                    .catch(reject);
            } else if (fileType === "staff-availability") {
                parseStaffAvailability(fileContent)
                    .then(resolve)
                    .catch(reject);
            }
        };

        reader.onerror = function() {
            reject(new Error("Error reading file"));
        };

        // Read the file as text (for CSV) or as binary (for XLSX)
        if (file.name.endsWith(".csv")) {
            reader.readAsText(file);
        } else if (file.name.endsWith(".xlsx")) {
            reader.readAsArrayBuffer(file);
        } else {
            reject(new Error("Unsupported file format"));
        }
    });
}

// Function to parse CSV files (you can use a CSV parser library like PapaParse for more advanced parsing)
function parseClientRequest(fileContent) {
    return new Promise((resolve, reject) => {
        try {
            // Example: simple CSV parsing
            const rows = fileContent.split("\n").map(row => row.split(","));
            resolve(rows);
        } catch (error) {
            reject(error);
        }
    });
}

// Function to parse XLSX files (using a library like SheetJS)
function parseStaffAvailability(fileContent) {
    return new Promise((resolve, reject) => {
        // Use SheetJS or another XLSX parser library
        const XLSX = window.XLSX;
        const workbook = XLSX.read(fileContent, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Assuming the first sheet is the relevant one
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        resolve(data);
    });
}

