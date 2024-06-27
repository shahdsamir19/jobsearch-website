document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const editParam = urlParams.get('edit');

    if (editParam) {
        const jobData = JSON.parse(decodeURIComponent(editParam));
        fillForm(jobData);
    }

    document.getElementById("Form").addEventListener("submit", function(event) {
        event.preventDefault();
        const formDetail = new FormData(event.target);
        const jobData = {
            id: formDetail.get("id"),
            job_title: formDetail.get("job_title"),
            salary: formDetail.get("salary"),
            company_name: formDetail.get("company_name"),
            job_status: formDetail.get("job_status"),
            description: formDetail.get("description"),
            years_of_experience: formDetail.get("years"),
            created_by_admin: formDetail.get("admin")
        };

        const jobId = jobData.id;
        const method = jobId ? 'PUT' : 'POST'; // Determine HTTP method based on whether jobId exists

        fetch(`api/add_job/${jobId}/`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Job saved successfully!');
            window.location.href = "admin_dashboard.html";
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert('Failed to save job. Please try again.');
        });
    });

    function fillForm(jobData) {
        document.querySelector('input[name="id"]').value = jobData.id;
        document.querySelector('input[name="job_title"]').value = jobData.job_title;
        document.querySelector('input[name="salary"]').value = jobData.salary;
        document.querySelector('input[name="company_name"]').value = jobData.company_name;
        document.querySelector('select[name="job_status"]').value = jobData.job_status;
        document.querySelector('input[name="description"]').value = jobData.description;
        document.querySelector('input[name="years"]').value = jobData.years_of_experience;
        document.querySelector('input[name="admin"]').value = jobData.created_by_admin;
    }
});
