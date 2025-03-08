document.addEventListener("DOMContentLoaded", function() {
    const correctPassword = "PNCS2025!"; // Correct password

    // Lock screen logic
    const lockScreen = document.getElementById("lock-screen");
    const contentWrapper = document.getElementById("content-wrapper");

    function checkPassword() {
        const enteredPassword = document.getElementById("password").value;
        if (enteredPassword === correctPassword) {
            lockScreen.style.display = "none";
            contentWrapper.style.display = "block";
        } else {
            alert("Incorrect password. Please try again.");
        }
    }
    document.querySelector("button").addEventListener("click", checkPassword);

    // Tab switching logic
    function setActiveTab(tab, content) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
        tab.classList.add('active');
        content.classList.add('active');
    }

    const employeeTab = document.getElementById("employee-tab");
    const clientTab = document.getElementById("client-tab");
    const createModifyTab = document.getElementById("create-modify-tab");

    const employeeContent = document.getElementById("employee-content");
    const clientContent = document.getElementById("client-content");
    const createModifyContent = document.getElementById("create-modify-content");

    employeeTab.addEventListener("click", () => setActiveTab(employeeTab, employeeContent));
    clientTab.addEventListener("click", () => setActiveTab(clientTab, clientContent));
    createModifyTab.addEventListener("click", () => setActiveTab(createModifyTab, createModifyContent));

    // Calendar logic
    let currentDate = new Date();

    function generateCalendar(targetElement) {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - startOfWeek.getDay()); // Start on Sunday

        let calendarHTML = `<table border="1"><tr>`;
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        days.forEach(day => calendarHTML += `<th>${day}</th>`);
        calendarHTML += `</tr><tr>`;

        for (let i = 0; i < 7; i++) {
            let date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            calendarHTML += `<td>${date.toDateString()}</td>`;
        }

        calendarHTML += `</tr></table>`;

        document.getElementById(targetElement).innerHTML = calendarHTML;
    }

    document.getElementById("prev-week").addEventListener("click", function() {
        currentDate.setDate(currentDate.getDate() - 7);
        generateCalendar("employee-calendar");
        generateCalendar("client-calendar");
    });

    document.getElementById("next-week").addEventListener("click", function() {
        currentDate.setDate(currentDate.getDate() + 7);
        generateCalendar("employee-calendar");
        generateCalendar("client-calendar");
    });

    // Initial calendar display
    generateCalendar("employee-calendar");
    generateCalendar("client-calendar");

    // File upload handling
    function handleFileUpload() {
        const clientRequestFile = document.getElementById("client-request").files[0];
        const staffAvailabilityFile = document.getElementById("staff-availability").files[0];

        if (!clientRequestFile || !staffAvailabilityFile) {
            alert("Please select both files before uploading.");
            return;
        }

        document.getElementById("file-status").innerText = "Uploading files...";

        processFile(clientRequestFile, "client-request")
            .then(clientData => {
                console.log("Client Request Data:", clientData);
                document.getElementById("file-status").innerText = "Files uploaded successfully!";
            })
            .catch(error => {
                console.error("Error processing client request file:", error);
                document.getElementById("file-status").innerText = "Error processing client request file.";
            });

        processFile(staffAvailabilityFile, "staff-availability")
            .then(staffData => {
                console.log("Staff Availability Data:", staffData);
            })
            .catch(error => {
                console.error("Error processing staff availability file:", error);
                document.getElementById("file-status").innerText = "Error processing staff availability file.";
            });
    }

    function processFile(file, fileType) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function(event) {
                const fileContent = event.target.result;

                if (fileType === "client-request") {
                    parseCSV(fileContent).then(resolve).catch(reject);
                } else if (fileType === "staff-availability") {
                    parseCSV(fileContent).then(resolve).catch(reject);
                }
            };

            reader.onerror = function() {
                reject(new Error("Error reading file"));
            };

            if (file.name.endsWith(".csv")) {
                reader.readAsText(file);
            } else if (file.name.endsWith(".xlsx")) {
                reader.readAsArrayBuffer(file);
            } else {
                reject(new Error("Unsupported file format"));
            }
        });
    }

    function parseCSV(fileContent) {
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
