$(document).ready(function() {
    $('#search-form').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                var results = $('#search-results ul');
                results.empty();
                if (data.jobs.length) {
                    $.each(data.jobs, function(index, job) {
                        results.append(
                            '<li>' +
                            '<strong>' + job.job_title + '</strong><br>' +
                            'Company: ' + job.company_name + '<br>' +
                            'Salary: ' + job.salary + '<br>' +
                            'Description: ' + job.description + '<br>' +
                            'Experience Required: ' + job.years_of_experience + ' years<br>' +
                            'Status: ' + job.job_status + '<br>' +
                            '</li>'
                        );
                    });
                } else {
                    results.append('<li>No jobs found matching your search criteria.</li>');
                }
            }
        });
    });
});