$(document).ready(() => {
    // User clicks checkmark to change todo to "completed"
    $(".complete-task").on("click", function(event) {
        event.preventDefault();
        const id = $(this).closest(".todo").data("id");

        // put request
        $.ajax({
            url: "api/todos/" + id,
            method: "PUT"
        }).then(() => {
            location.reload();
        });
    });

    $(".open-form").on("click", event => {
        $("#add-task-modal").modal("toggle");
    });
});