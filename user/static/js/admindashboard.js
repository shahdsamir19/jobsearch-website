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
                <button class="edit-button" data-index="${index}">Edit</button>
                <button class="delete-button" data-index="${index}">Delete</button>
                <hr>
            `;
            jobListContainer.appendChild(jobItem);
        });
    }

    jobListContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-button')) {
            const index = event.target.dataset.index;
            const editedJob = encodeURIComponent(JSON.stringify(jobs[index]));
            window.location.href = `add_job/?edit=${editedJob}`;
        } else if (event.target.classList.contains('delete-button')) {
            const index = event.target.dataset.index;
            if (confirm('Are you sure you want to delete this job?')) {
                const jobId = jobs[index].id;
                fetch(`api/delete_job/${jobId}/`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    jobs.splice(index, 1);
                    displayJobs(jobs);
                    alert('Job deleted successfully!');
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
            }
        }
    });
});
