document.addEventListener("DOMContentLoaded", function() {
    const appliedJobsContainer = document.querySelector('.content tbody');

    fetch('api/applied_jobs/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(appliedJobs => {
            displayAppliedJobs(appliedJobs);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

        function displayAppliedJobs(appliedJobs) {
            const appliedJobsContainer = document.querySelector('.content tbody');
            appliedJobsContainer.innerHTML = ''; // Clear previous content
        
            appliedJobs.forEach(job => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><a href="#">${job.id}</a></td>
                    <td>${job.job_title}</td>
                    <td>${job.salary}</td>
                    <td>${job.company_name}</td>
                    <td>${job.job_status}</td>
                `;
                appliedJobsContainer.appendChild(row);
            })}})