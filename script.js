const serverUrl = 'http://localhost:8080/api/bookmarks/'
let isUserEditing = false
let itemUnderEdit = {}

$('form.post').submit(handlePost)
$('form.update').submit(handleUpdate)
$(document).ready(loadData)

function loadData () {
  $('ul').html('')
  let data = $.getJSON(serverUrl).then(response => {
    response.forEach(bookmark => {
      const listItemFeatLink = $(`<li><a href="${bookmark.url}">${bookmark.title}</a></li>`)
      const updateLink = $(`<button class="update" data-title="${bookmark.title}"> Update </button>`)
      const deleteLink = $(`<button class="delete" data-title="${bookmark.title}"> Delete </button>`)
      $(listItemFeatLink).append(updateLink)
      $(listItemFeatLink).append(deleteLink)
      $('ul').append(listItemFeatLink)
    })

    $('button.update').click(event => {
      isUserEditing = !isUserEditing
      const buttonText = isUserEditing ? 'Cancel' : 'Update'
      $(event.target).html(buttonText)
      $('form').toggleClass('hidden')
      let currentTitle = $(event.target).siblings('a').html()
      let currentUrl = $(event.target).siblings('a').attr('href')
      itemUnderEdit = {
        title: currentTitle,
        url: currentUrl
      }
      $('.update input[name="title"]').val(currentTitle)
      $('.update input[name="url"]').val(currentUrl)
    })

    $('button.delete').click(event => {
      let title = $(event.target).attr('data-title')
      const deleteRequestContent = {
        url: serverUrl + title,
        type: 'DELETE',
        dataType: 'json'
      }
      $.ajax(deleteRequestContent)
        .then(loadData)
        .fail(error => console.error(error))
    })
  })
}

function handlePost (event) {
  event.preventDefault()
  const bookmarkTitle = $('.post input[name="title"]').val()
  const bookmarkUrl = $('.post input[name="url"]').val()

  const newData = {
    title: bookmarkTitle,
    url: bookmarkUrl
  }

  const requestContent = {
    url: serverUrl,
    type: 'POST',
    dataType: 'json',
    data: newData
  }

  $.ajax(requestContent)
    .then(loadData)
    .fail(error => console.error(error))
}

function handleUpdate (event) {
  event.preventDefault()
  const bookmarkTitle = $('.update input[name="title"]').val()
  const bookmarkUrl = $('.update input[name="url"]').val()

  const newData = {
    title: bookmarkTitle,
    url: bookmarkUrl
  }

  const requestContent = {
    url: serverUrl + itemUnderEdit.title,
    type: 'PUT',
    dataType: 'json',
    data: newData
  }

  $.ajax(requestContent)
    .then(() => {
      isUserEditing = !isUserEditing
      $('button.update').html('Update')
      $('form').toggleClass('hidden')
      loadData()
    })
    .fail(error => console.error(error))
}
