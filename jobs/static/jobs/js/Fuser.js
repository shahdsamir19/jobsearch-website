document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchTypeSelect = document.getElementById('searchType');
    const searchResultsContainer = document.getElementById('searchResults');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchType = searchTypeSelect.value;
        const searchTerm = searchInput.value.trim();

        if (searchTerm === '') {
            alert('Please enter a search term.');
            searchInput.focus();
            return;
        }

        fetch(`api/search_jobs/?type=${searchType}&term=${searchTerm}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(searchResults => {
                displaySearchResults(searchResults);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    });

    function displaySearchResults(searchResults) {
        searchResultsContainer.innerHTML = '';
        searchResults.forEach(job => {
            const jobItem = document.createElement('div');
            jobItem.classList.add('job-item');
            jobItem.innerHTML = `
                <h2>${job.job_title}</h2>
                <p><strong>ID:</strong> ${job.id}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
                <p><strong>Company:</strong> ${job.company_name}</p>
                <p><strong>Status:</strong> ${job.job_status}</p>
                <p><strong>Description:</strong> ${job.description}</p>
                <p><strong>Years of Experience:</strong> ${job.years_of_experience}</p>
                <p><strong>Created by Admin:</strong> ${job.created_by_admin}</p>
                <hr>
            `;
            searchResultsContainer.appendChild(jobItem);
        });
    }

    const logoutButton = document.querySelector('nav #logout');
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Logout successful!');
    });

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});