$('body').on('change', 'input[type="file"][data-toggle="custom-file"]', function (ev) {

     const $input = $(this);
     const target = $input.data('target');
     const $target = $(target);

     if (!$target.length)
       return console.error('Invalid target for custom file', $input);

     if (!$target.attr('data-content'))
       return console.error('Invalid `data-content` for custom file target', $input);

     // set original content so we can revert if user deselects file
     if (!$target.attr('data-original-content'))
       $target.attr('data-original-content', $target.attr('data-content'));

     const input = $input.get(0);

     let name = _.isObject(input)
       && _.isObject(input.files)
       && _.isObject(input.files[0])
       && _.isString(input.files[0].name) ? input.files[0].name : $input.val();

     if (_.isNull(name) || name === '')
       name = $target.attr('data-original-content');

     $target.attr('data-content', name);

   });

   function post(path, parameters) {
       var form = $('<form></form>');

       form.attr("method", "post");
       form.attr("action", path);

       $.each(parameters, function(key, value) {
           var field = $('<input></input>');

           field.attr("type", "hidden");
           field.attr("name", key);
           field.attr("value", value);

           form.append(field);
       });

       // The form needs to be a part of the document in
       // order for us to be able to submit it.
       $(document.body).append(form);
       form.submit();
   }

// alert message
   $("[data-hide]").on("click", function(){
           $('#alertbox').hide();
    });

   $("#submitModal").on("hidden.bs.modal", function(){
           $('#alertbox').hide();
    });

// check if webmail is valid
$(document).ready(function() {
   $("form").submit(function (e) {
     // search webmail.txt for webmail - if found, read from text file
     // else read from localStorage
     var pos = -1;
     var foundemail = false;
     var webmail = $("#webmail").val();
     $.ajax({
       url:"./data/email.txt",
       async:false,
       success: function (data){
         //console.log(data);
         var lines = data.split('\n');

         for (var i = 0; i < lines.length; i++) {
           if(lines[i].replace(/\s/g, "") == webmail)
           {
             pos = i;
             foundemail = true;
             break;
           }
         }
   }});

   if (!foundemail) {
     console.log("stopped!");
     $("#alertbox").show();
     e.preventDefault();
     return false;
   }
   else {
     console.log("submitted");

     var imgsrc = "NULL";
     if($("#imfile").attr('data-content') != "An image (optional)")
     {
       imgsrc = $("#imfile").attr('data-content');
     }

     var passdata = {
        'webmail' : $("#webmail").val(),
        'pos' : pos,
        'imgsrc' : imgsrc,
        'CS204 - Algorithms' : $('input[name="course1"]').is(':checked'),
        'CS202 - Discrete Mathematics' : $('input[name="course2"]').is(':checked'),
        'CS346 - Compilers' :  $('input[name="course3"]').is(':checked'),
        'CS461 - Computer Graphics' :  $('input[name="course4"]').is(':checked'),
        'CS301 - Theory of Computation' :  $('input[name="course5"]').is(':checked'),
        'CS221 - Digital Design' :  $('input[name="course6"]').is(':checked'),
        'CS341 - Operating Systems' :  $('input[name="course7"]').is(':checked'),
        'CS343 - Data Communication' :  $('input[name="course8"]').is(':checked'),
        'theme' : $('input[name="theme"]:checked').val()
        };

     console.log(passdata);
     localStorage.setItem('details', JSON.stringify(passdata));
   }
  });
 });
