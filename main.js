// AJAX - load from txt file
function loaddata()
{
  $.ajax({
    url:"./data/formdata.txt",
    success: function (data){
      console.log(data);
      var lines = data.split('\n');

      // first name + last name
      // trim whitespace
      $("#headingname").text(lines[0].replace(/\s/g, "")  + " " + lines[1].replace(/\s/g, ""));
      document.title = lines[0].replace(/\s/g, "")  + " " + lines[1].replace(/\s/g, "") + " at IIT Guwahati";

      // title
      if(lines[2].replace(/\s/g, "") != "NULL")
      {
        $("#headingtitle").text(lines[2]);
      }

      // email
      $("#email").text(lines[3]);

      // image source
      if(lines[4] != "NULL")
      {
        $("#headingimage").src = lines[4];
      }

      // courses
      for(var i = 5; i < 13; i++)
      {
        //$("#image")
      }

      // theme
      // change colors if not theme1
      if(lines[13].replace(/\s/g, "") != "theme1")
      {
        $('link[href="./main1.css"]').attr({href : "./main" + lines[13].replace("theme", "") + ".css"});
        $("#roomdiv").attr("class", "list-group-item list-group-item-dark");
        $("#phonediv").attr("class", "list-group-item list-group-item-secondary");
        $("#emaildiv").attr("class", "list-group-item list-group-item-dark");
      }

    }
  });
};

$(document).ready(loaddata());

// date
$(function () {
                $('#datetimepicker1').datetimepicker();
            });

// calendar
var CLIENT_ID = '368873152645-6817bgr1i23hk3aig7du1u2bu6s82o3q.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBjtLM_O5xj5ASZixVzGRkempSuZAHGymQ';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

function handleClientLoad() {
       gapi.load('client:auth2', initClient);
     }

     /**
      *  Initializes the API client library and sets up sign-in state
      *  listeners.
      */
function initClient() {
       gapi.client.init({
         apiKey: API_KEY,
         clientId: CLIENT_ID,
         discoveryDocs: DISCOVERY_DOCS,
         scope: SCOPES
       }).then(function () {
         // Listen for sign-in state changes.
         gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

         // Handle the initial sign-in state.
         updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
         authorizeButton.onclick = handleAuthClick;
         signoutButton.onclick = handleSignoutClick;
       });
     }

     /**
      *  Called when the signed in status changes, to update the UI
      *  appropriately. After a sign-in, the API is called.
      */
function updateSigninStatus(isSignedIn) {
       if (isSignedIn) {
         authorizeButton.style.display = 'none';
         signoutButton.style.display = 'inline-block';
       } else {
         authorizeButton.style.display = 'inline-block';
         signoutButton.style.display = 'none';
       }
     }

     /**
      *  Sign in the user upon button click.
      */
function handleAuthClick(event) {
       gapi.auth2.getAuthInstance().signIn();
     }

     /**
      *  Sign out the user upon button click.
      */
function handleSignoutClick(event) {
       gapi.auth2.getAuthInstance().signOut();
     }

function addmeeting()
{
  var fullname = document.getElementById('fullname').value;
  var starttime = moment(document.getElementById('datetime').value).format();
  var endtime = moment(document.getElementById('datetime').value).add(1, 'hours').format();

  console.log(starttime, endtime);
  addevent(starttime, endtime, "Meeting with " + fullname);
}

function addevent(starttime, endtime, title)
{
  var resource = {
   "end": {
    "dateTime": endtime,
    "timeZone": "Asia/Kolkata"
   },
   "start": {
    "dateTime": starttime,
    "timeZone": "Asia/Kolkata"
   },
   "summary": title

  };


  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': resource
  });

  request.execute();

  // reload calendar
  document.getElementById('calendar').src = document.getElementById('calendar').src;

};
