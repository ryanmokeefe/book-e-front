const serverUrl = 'http://localhost:8080/api/bookmarks/'
let isUserEditing = false
let itemUnderEdit = {}

$('form.post').submit(handlePost)
$('form.update').submit(handleUpdate)
$(document).ready(loadData)

function handlePost (event) {
  event.preventDefault()
  const bookmarkTitle = $('.post input[name="title"]').val()
  const bookmarkUrl = $('.post input[name="url"]').val()
  // Use $.ajax to make a POST request here
  // uncomment the console.log below, and use the console and element inspector to figure out how to
  // target the element you need using the jQuery function ($)
  // console.log(event.target)
}

function handleDelete (event) {
  // Use $.ajax to make a DELETE request here
  // uncomment the console.log below, and use the console and element inspector to figure out how to
  // target the element you need using the jQuery function ($)
  // console.log(event.target)
}

function handleUpdate (event) {
  // Use $.ajax to make a PUT request here
  // itemUnderEdit will contain the original values of the item being edited
  // uncomment the console.log below, and use the console and element inspector to figure out how to
  // target the element you need using the jQuery function ($)
  // console.log(event.target)
}

// NOTE: you will NOT need to alter any code below this line

function loadData () {
  $('ul').html('')
  let data = $.getJSON(serverUrl).then(response => {
    // Take data in db and for each entry, create a tags and 2 buttons: one for deletion and one for
    // showing the edit/update form
    response.forEach(bookmark => {
      const listItemFeatLink = $(`<li><a href="${bookmark.url}">${bookmark.title}</a></li>`)
      const updateLink = $(`<button class="update" data-title="${bookmark.title}"> Update </button>`)
      const deleteLink = $(`<button class="delete" data-title="${bookmark.title}"> Delete </button>`)
      $(listItemFeatLink).append(updateLink)
      $(listItemFeatLink).append(deleteLink)
      $('ul').append(listItemFeatLink)
    })

    $('button.update').click(event => {
      isUserEditing = !isUserEditing // toggles the boolean value of isUserEditing
      const buttonText = isUserEditing ? 'Cancel' : 'Update'
      $(event.target).html(buttonText)

      $('form').toggleClass('hidden') // hides post form and shows the editing form
      let currentTitle = $(event.target).siblings('a').html()
      let currentUrl = $(event.target).siblings('a').attr('href')
      itemUnderEdit = {
        title: currentTitle,
        url: currentUrl
      }
      // Populates the form with the values of the Bookmark being edited
      $('.update input[name="title"]').val(currentTitle)
      $('.update input[name="url"]').val(currentUrl)
    })

    $('button.delete').click(handleDelete)
  })
}
