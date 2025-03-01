// JavaScript for password check and tab switching
document.addEventListener("DOMContentLoaded", function() {
    const correctPassword = "PNCS2025!";  // Correct password for accessing the site

    // Lock screen check on page load
    const lockScreen = document.getElementById("lock-screen");
    const contentWrapper = document.getElementById("content-wrapper");

    // Function to check the password
    function checkPassword() {
        const enteredPassword = document.getElementById("password").value;

        // Check if the entered password matches the correct one
        if (enteredPassword === correctPassword) {
            // Hide the lock screen and show the content
            lockScreen.style.display = "none";
            contentWrapper.style.display = "block";
        } else {
            alert("Incorrect password. Please try again.");
        }
    }

    // Attach password check function to the submit button
    document.querySelector("button").addEventListener("click", checkPassword);

    // Tab switching logic
    const employeeTab = document.getElementById("employee-tab");
    const clientTab = document.getElementById("client-tab");
    const createModifyTab = document.getElementById("create-modify-tab");

    const employeeContent = document.getElementById("employee-content");
    const clientContent = document.getElementById("client-content");
    const createModifyContent = document.getElementById("create-modify-content");

    // Function to set active tab and its content
    function setActiveTab(tab, content) {
        // Remove active class from all tabs and content sections
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));

        // Add active class to the clicked tab and its corresponding content
        tab.classList.add('active');
        content.classList.add('active');
    }

    // Set the initial active tab (Employee Schedules by default)
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

    // File upload and processing functions
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
                console.log("Client Request Data:", clientData);
                document.getElementById("file-status").innerText = "Files uploaded successfully!";
            })
            .catch(error => {
                console.error("Error processing client request file:", error);
                document.getElementById("file-status").innerText = "Error processing client request file.";
            });

        // Process Staff Availability File (CSV or XLSX)
        processFile(staffAvailabilityFile, "staff-availability")
            .then(staffData => {
                console.log("Staff Availability Data:", staffData);
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

    // Function to parse CSV files (example simple parsing)
    function parseClientRequest(fileContent) {
        return new Promise((resolve, reject) => {
            try {
                const rows = fileContent.split("\n");
                const parsedData = rows.map(row => row.split(","));
                resolve(parsedData);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Function to parse Staff Availability files (example simple parsing)
    function parseStaffAvailability(fileContent) {
        return new Promise((resolve, reject) => {
            try {
                const rows = fileContent.split("\n");
                const parsedData = rows.map(row => row.split(","));
                resolve(parsedData);
            } catch (error) {
                reject(error);
            }
        });
    }
});
