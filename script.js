document.addEventListener('DOMContentLoaded', function() {
    const dealTypeButtons = document.querySelectorAll('.deal-type');
    const pxOptionsButtons = document.querySelectorAll('.px-option');
    const settlementOptionsButtons = document.querySelectorAll('.settlement-option');
    const startOverBtn = document.getElementById('startOverBtn');
    let selectedDocuments = []; // To hold the currently selected documents
    let progress = 0; // To track the progress percentage

    const allDocuments = {
        common: [
            'Front Sheet', 'Handover Sheet', 'Invoice', 'Driving License', 'Certificate of Insurance', 
            'Transfer of Ownership', 'Tax Confirmation', 'Proof of Payment'
        ],
        finance: ['Payout Confirmation', 'Proof of Address'],
        partExchange: ['Part Exchange V5', 'Bought into Trade'],
        settlement: ['Settlement Documentation']
    };

    function resetApplication() {
        document.querySelectorAll('.section').forEach(section => section.classList.add('hidden'));
        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('clicked');
        });
        document.getElementById('dealTypeSection').classList.remove('hidden');
        document.getElementById('progressBar').style.width = '0%';
        selectedDocuments = [...allDocuments.common];
        updateProgressBar();

        // Reset the finalChecksSection
        const finalChecksSection = document.getElementById('finalChecksSection');
        finalChecksSection.innerHTML = '<h2>Final Checks</h2>'; // Reset the inner HTML
        finalChecksSection.classList.add('hidden');
        // Remove any dynamically added final check buttons here if necessary
    }

    function updateProgressBar() {
        const totalDocs = selectedDocuments.length;
        const completedDocs = document.querySelectorAll('.document.clicked').length;
        progress = totalDocs > 0 ? (completedDocs / totalDocs) * 100 : 0;
        document.getElementById('progressBar').style.width = `${progress}%`;
        updateProgressBarColor(progress);
    }

    function updateProgressBarColor(percentage) {
        const progressBar = document.getElementById('progressBar');
        if (percentage < 40) {
            progressBar.style.backgroundColor = 'red';
        } else if (percentage >= 40 && percentage < 100) {
            progressBar.style.backgroundColor = 'yellow';
        } else if (percentage === 100) {
            progressBar.style.backgroundColor = 'green';
            populateFinalChecks();
        }
    }

    function populateFinalChecks() {
        const finalChecksSection = document.getElementById('finalChecksSection');
        // Clear previous buttons if any (to prevent duplicates if this function is called more than once)
        finalChecksSection.innerHTML = '<h2>Final Checks</h2>'; // Reset the inner HTML

        const finalChecks = ['Handover Photo', 'Service Quote', 'Customer Review', 'Scanned and Uploaded Deal File', 'Handover Completed on Sales System'];
        finalChecks.forEach(check => {
            const checkButton = document.createElement('button');
            checkButton.textContent = check;
            checkButton.classList.add('btn', 'final-check');
            checkButton.addEventListener('click', function() {
                this.classList.toggle('clicked');
            });
            finalChecksSection.appendChild(checkButton);
        });

        finalChecksSection.classList.remove('hidden');
    }

    function populateDocumentList() {
        const documentListSection = document.getElementById('documentListSection');
        documentListSection.innerHTML = '<h2>Required Documents</h2>';
        selectedDocuments.forEach(doc => {
            const docButton = document.createElement('button');
            docButton.textContent = doc;
            docButton.classList.add('btn', 'document');
            docButton.addEventListener('click', function() {
                this.classList.toggle('clicked');
                updateProgressBar();
            });
            documentListSection.appendChild(docButton);
        });
        document.getElementById('progressBarContainer').classList.remove('hidden');
        showSection('documentListSection');
    }

    function showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => section.classList.add('hidden'));
        document.getElementById(sectionId).classList.remove('hidden');
    }

    dealTypeButtons.forEach(button => button.addEventListener('click', function() {
        const dealType = this.textContent.toLowerCase();
        selectedDocuments = [...allDocuments.common];
        if (dealType === 'finance') {
            selectedDocuments.push(...allDocuments.finance);
        }
        showSection('partExchangeSection');
    }));

    pxOptionsButtons.forEach(button => button.addEventListener('click', function() {
        if (this.textContent === 'Yes') {
            selectedDocuments.push(...allDocuments.partExchange);
            showSection('settlementSection');
        } else {
            populateDocumentList();
        }
    }));

    settlementOptionsButtons.forEach(button => button.addEventListener('click', function() {
        if (this.textContent === 'Yes') {
            selectedDocuments.push(...allDocuments.settlement);
        }
        populateDocumentList();
    }));

    startOverBtn.addEventListener('click', resetApplication);

    resetApplication();
});
