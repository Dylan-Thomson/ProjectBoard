$(document).ready(() => {
    // Add new task
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
    
    // Update status from form
    $("#submit-status").on("click", function(event) {
        event.preventDefault();
        const id = $(this).data("id");
        $.ajax({
            url: "api/todos/" + id + "/" + $("#update-status").val(),
            method: "PUT"
        }).then(() => {
            location.reload();
        })
    });
    
    // Open view task modal
    $(".view-task").on("click", function(event) {
        const id = $(this).closest(".task").data("id");
        $.ajax({
            url: "api/todos/" + id,
            method: "GET"
        }).then(result => {
            $("#view-modal-task").text(result[0].task);
            $("#view-modal-status").text(result[0].status);
            $("#submit-status").data("id", result[0].id);
            $("#view-task-modal").modal("show");
        });
    });
    
    // Open add task modal
    $(".add-todo").on("click", function(event) {
        $("#submit-task").data("status", $(this).data("status"));
        $("#add-task-modal").modal("show");
    });
    
    // Drag tasks to change status
    setDraggable($(".task"));
    $(".task-list-ul").droppable({
        accept: ".task",
        drop: function(event, ui) {
            cloned = ui.helper.clone().css({"position": "", "top": "", "left": ""});
            setDraggable(cloned);
            const updatedStatus = $(this).data("status");
            const id = cloned.data("id");
            
            if(updatedStatus !== cloned.data("status")) {
                $.ajax({
                    url: "api/todos/" + id + "/" + updatedStatus,
                    method: "PUT"
                }).then(() => {
                    location.reload();
                });
            }
            
        }
    });
});

function setDraggable(element) {
    element.draggable({
        start: function(event, ui) {
            $(this).addClass("dragged");
        },
        stop: function(event, ui) {
            $(this).removeClass("dragged");
        },
        revert: true
    });
}