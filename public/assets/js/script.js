$(document).ready(() => {
    // User clicks checkmark to change todo to "completed"
    $(".set-complete").on("click", function(event) {
        event.preventDefault();
        const id = $(this).closest(".task").data("id");

        // put request
        $.ajax({
            url: "api/todos/" + id + "/complete",
            method: "PUT"
        }).then(() => {
            location.reload();
        });
    });

    $(".set-in-progress").on("click", function(event) {
        event.preventDefault();
        const id = $(this).closest(".task").data("id");

        $.ajax({
            url: "api/todos/" + id + "/in-progress",
            method: "PUT"
        }).then(() => {
            location.reload();
        });
    });

    $(".add-todo").on("click", function(event) {
        $("#submit-task").data("status", $(this).data("status"));
        $("#add-task-modal").modal("toggle");
    });

    $("#submit-task").on("click", function(event) {
        event.preventDefault();
        const task = $("#task-input").val();
        const status = $(this).data("status");
        const data = {
            task: task,
            status: status
        }

        $.ajax({
            url: "api/todos",
            method: "POST",
            data: data

        }).then(() => {
            location.reload();
        })
    });

    // $("li").draggable();
});