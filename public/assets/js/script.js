$(document).ready(() => {
    $(".complete").on("click", function(event) {
        event.preventDefault();
        const id = $(this).data("id");
        console.log($(this).data("id"));

        // put request
        $.ajax({
            url: "api/todos/" + id,
            method: "PUT"
        }).then(() => {
            location.reload();
        });
    });
});