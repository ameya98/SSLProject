function submitForm(oFormElement)
{
  console.log('submitted');

  var xhr = new XMLHttpRequest();
  xhr.onload = function(){ alert (xhr.responseText); }
  xhr.open (oFormElement.method, oFormElement.action, true);
  xhr.send (new FormData (oFormElement));
  return false; // Markus had to return true */
}
