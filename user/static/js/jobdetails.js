document.addEventListener('DOMContentLoaded', function() {
    const jobListContainer = document.getElementById('jobList');

    fetch('api/jobs/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jobList => {
            displayJobs(jobList);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    function displayJobs(jobs) {
        jobListContainer.innerHTML = '';
        jobs.forEach((job, index) => {
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
                <button class="apply-button" data-index="${index}">Apply</button>
                <hr>
            `;
            jobListContainer.appendChild(jobItem);
        });
    }

    jobListContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('apply-button')) {
            const index = event.target.dataset.index;
            // Perform action for applying to the job, e.g., sending an AJAX request
            alert('You have applied for this job!');
        }
    });
});
