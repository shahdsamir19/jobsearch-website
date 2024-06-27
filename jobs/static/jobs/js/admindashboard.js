



document.addEventListener('DOMContentLoaded', function() {
    const jobListContainer = document.getElementById('jobList');
    

    fetch('/api/jobs/')
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
                <button class="edit-button" data-id="${job.id}">Edit</button>
                <button class="delete-button" data-id="${job.id}">Delete</button>
                <hr>
            `;
            jobListContainer.appendChild(jobItem);
        });

        jobListContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('edit-button')) {
                const jobId = event.target.dataset.id;
                window.location.href = `/add-job/?edit=${jobId}`;
            } 
            else if (event.target.classList.contains('delete-button')) {
                if (confirm('Are you sure you want to delete this job?')) {
                    const jobId = event.target.dataset.id;
                    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                    $.ajax({
                        url: `/api/delete_job/${jobId}/`,
                        type: 'DELETE',
                        beforeSend: function(xhr, settings) {
                            xhr.setRequestHeader("X-CSRFToken", csrfToken);
                        },
                        success: function(response) {
                            if (response.message === 'Job deleted successfully') {
                                const jobElement = event.target.closest('.job-item');
                                jobElement.remove();
                                alert('Job deleted successfully!');
                            } else {
                                alert('Failed to delete job.');
                            }
                        },
                        error: function(xhr, status, error) {
                            if (xhr.status == 404) {
                                alert('Job not found');
                            } else if (xhr.status == 405) {
                                alert('Method not allowed');
                            } else {
                                alert('An error occurred: ' + error);
                            }
                        }
                    });
                }
            }
        });
    }
});
