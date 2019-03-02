$(document).ready(() => {
  // Add new task
  $('#submit-task').on('click', (event) => {
    event.preventDefault();
    const task = $('#task-input').val();
    const status = $(event.currentTarget).data('status');
    const data = {
      task,
      status,
    };

    $.ajax({
      url: 'api/todos',
      method: 'POST',
      data,

    }).then(() => {
      window.location.reload();
    });
  });

  // Update status from form
  $('#submit-status').on('click', (event) => {
    event.preventDefault();
    const id = $(event.currentTarget).data('id');
    $.ajax({
      url: `api/todos/${id}/${$('#update-status').val()}`,
      method: 'PUT',
    }).then(() => {
      window.location.reload();
    });
  });

  // Open view task modal
  $('.view-task').on('click', (event) => {
    const id = $(event.currentTarget).closest('.task').data('id');
    $.ajax({
      url: `api/todos/${id}`,
      method: 'GET',
    }).then((result) => {
      $('#view-modal-task').text(result[0].task);
      $('#view-modal-status').text(result[0].status);
      $('#submit-status').data('id', result[0].id);
      $('#view-task-modal').modal('show');
    });
  });

  // Open add task modal
  $('.add-todo').on('click', (event) => {
    $('#submit-task').data('status', $(event.currentTarget).data('status'));
    $('#add-task-modal').modal('show');
  });

  // Drag tasks to change status
  setDraggable($('.task'));
  $('.task-list-ul').droppable({
    accept: '.task',
    drop: (event, ui) => {
      const cloned = ui.helper.clone().css({ position: '', top: '', left: '' });
      setDraggable(cloned);
      const updatedStatus = $(event.target).data('status');
      const id = cloned.data('id');
      if (updatedStatus !== cloned.data('status')) {
        $.ajax({
          url: `api/todos/${id}/${updatedStatus}`,
          method: 'PUT',
        }).then(() => {
          window.location.reload();
        });
      }
    },
  });
});

function setDraggable(element) {
  element.draggable({
    start: (event) => {
      $(event.target).addClass('dragged');
    },
    stop: (event) => {
      $(event.target).removeClass('dragged');
    },
    revert: true,
  });
}
