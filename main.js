// AJAX - load from txt file
function loaddata()
{
  // get details from localStorage
  var details = JSON.parse(localStorage.getItem('details'));
  console.log(details);

  // change colors if not theme1
  if(details.theme != "theme1")
  {
    $('link[href="./main1.css"]').attr({href : "./main" + details.theme.replace("theme", "") + ".css"});
    $("#roomdiv").attr("class", "list-group-item list-group-item-dark");
    $("#phonediv").attr("class", "list-group-item list-group-item-secondary");
    $("#emaildiv").attr("class", "list-group-item list-group-item-dark");
  }

    var headingname, maintitle, headingtitle, email, imgsrc, room, phone;
    // AJAX calls to different files
    // name
    $.ajax({
      url:"./data/name.txt",
      success: function (data){
        //console.log(data);
        var lines = data.split('\n');

        headingname = lines[details.pos];
        $("#headingname").text(headingname);
        maintitle = headingname + " at IIT Guwahati";
        document.title = maintitle;

      }
    });

    // title
    $.ajax({
      url:"./data/title.txt",
      success: function (data){
        //console.log(data);
        var lines = data.split('\n');

        headingtitle = lines[details.pos];
        $("#headingtitle").text(headingtitle);

      }
    });

    // research
    $.ajax({
      url:"./data/research.txt",
      success: function (data){
        //console.log(data);
        var lines = data.split('\n');

        $("#research").text(lines[details.pos]);

      }
    });

    // room
    $.ajax({
      url:"./data/room.txt",
      success: function (data){
      //  console.log(data);
        var lines = data.split('\n');

        room = lines[details.pos] + ", CSE Department";
        $("#room").text(room);
      }
    });

    // phone
    $.ajax({
      url:"./data/phone.txt",
      success: function (data){
      //  console.log(data);
        var lines = data.split('\n');

        phone = lines[details.pos];
        $("#phone").text(phone);

      }
    });


  email = details.webmail;
  $("#email").text(email);

  imgsrc = details.imgsrc;
  if(imgsrc != "NULL")
  {
    $("#headingimage").src = imgsrc;
  }

  // courses

};

$(document).ready(loaddata());

// save file
function savefile()
{
  var dataobj = {'name' :  $("#headingname").text().split(' '), 'html' : $('html').html()};
  $.ajax({
    type: "details.posT",
    url:"./save.php",
    data: JSON.stringify(dataobj),
    success: function(data){
      $('#downloadlink').attr({href :  "./" + $("#headingname").text().split(' ') + ".html"});
    }
  })
};
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
