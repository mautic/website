# Schedule Mautic Personal Demo

<script>


function isValidEmail(email)
{
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test(email) == false) {
        return false;
    }
    return true;
}

function checkForm(myForm)
{
    var errors = "";
    
        if (myForm.f_firstname.value == "")
            errors = "Please enter your First Name.\n";
        if (myForm.f_lastname.value == "")
            errors += "Please enter your Last Name.\n";
        if (!isValidEmail(myForm.f_email.value))
            errors += "Please enter a valid Email.\n";
                                    
                    
    
    if (errors != "")
    {
        alert(errors);
        return false;
    }
    else
    {
        return true;
    }
}

</script>


Hi! We are thrilled to hear you're interested in learning more about Mautic. We get that sometimes creating your own account and digging into things on your own can feel overwhelming and a bit daunting. If you would like a personal guided tour of Mautic then simply fill out the form below to join our next webinar. And don't worry if this one is full - we will be scheduling many more!
  




### Next Meeting Details

**Date**: Tuesday, October 27  

**Time**: 2:00 PM EDT [(Check Local Time)](http://www.timeanddate.com/worldclock/fixedtime.html?msg=Mautic+Personal+Demo&iso=20151027T14&p1=%3A&am=45)  




### Register





<form action="http://mautic.enterthemeeting.com/m/do_register" method="post" onsubmit="javascript:return checkForm(this);">
<div id="mauticform_downloadmautic_error" class="mauticform-error"></div>
<div id="mauticform_downloadmautic_message" class="mauticform-message"></div>
<p></p><div class="grid one-half">
<div class="form-group"><input class="form-control" name="f_firstname" type="text" value="" placeholder="First Name"></div>
<p></p></div><div class="grid one-half last">
<div class="form-group"><input class="form-control" name="f_lastname" type="text" value="" placeholder="Last Name"></div>
<p></p></div><div class="clear"></div>
<div class="form-group"><input class="form-control" name="f_email" type="email" value="" placeholder="Email Address"></div>
<p><button class="btn btn-cta btn-cta-primary" type="submit"><i id="download_button_icon"></i>Register</button>
<input type="hidden" name="meeting_instance_id" value="603317"><input type="hidden" name="event" value="meeting_register"><input type="hidden" name="val_required" value="f_firstname,f_lastname,f_email"></p></form>