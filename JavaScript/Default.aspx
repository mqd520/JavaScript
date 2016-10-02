﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="JavaScript.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="Scripts/jquery-1.8.2.min.js"></script>
    <script src="Scripts/jquery-1.8.2.intellisense.js"></script>
    <script src="Scripts/jQuery_Validate/jquery.validate-vsdoc.js"></script>
    <script type="text/javascript">
        $.validator.setDefaults({
            submitHandler: function () {
                alert("submitted!");
            }
        });

        $().ready(function () {
            // validate the comment form when it is submitted
            $("#commentForm").validate();

            // validate signup form on keyup and submit
            $("#signupForm").validate({
                rules: {
                    firstname: "required",
                    lastname: "required",
                    username: {
                        required: true,
                        minlength: 2
                    },
                    password: {
                        required: true,
                        minlength: 5
                    },
                    confirm_password: {
                        required: true,
                        minlength: 5,
                        equalTo: "#password"
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    topic: {
                        required: "#newsletter:checked",
                        minlength: 2
                    },
                    agree: "required"
                },
                messages: {
                    firstname: "Please enter your firstname",
                    lastname: "Please enter your lastname",
                    username: {
                        required: "Please enter a username",
                        minlength: "Your username must consist of at least 2 characters"
                    },
                    password: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    confirm_password: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long",
                        equalTo: "Please enter the same password as above"
                    },
                    email: "Please enter a valid email address",
                    agree: "Please accept our policy",
                    topic: "Please select at least 2 topics"
                }
            });

            // propose username by combining first- and lastname
            $("#username").focus(function () {
                var firstname = $("#firstname").val();
                var lastname = $("#lastname").val();
                if (firstname && lastname && !this.value) {
                    this.value = firstname + "." + lastname;
                }
            });

            //code to hide topic selection, disable for demo
            var newsletter = $("#newsletter");
            // newsletter topics are optional, hide at first
            var inital = newsletter.is(":checked");
            var topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
            var topicInputs = topics.find("input").attr("disabled", !inital);
            // show when newsletter is checked
            newsletter.click(function () {
                topics[this.checked ? "removeClass" : "addClass"]("gray");
                topicInputs.attr("disabled", !this.checked);
            });
        });
    </script>
</head>
<body>
    <div id="main">
        <form class="cmxform" id="commentForm" method="get" action="">
            <fieldset>
                <legend>Please provide your name, email address (won't be published) and a comment</legend>
                <p>
                    <label for="cname">Name (required, at least 2 characters)</label>
                    <input id="cname" name="name" minlength="2" type="text" required>
                </p>
                <p>
                    <label for="cemail">E-Mail (required)</label>
                    <input id="cemail" type="email" name="email" required>
                </p>
                <p>
                    <label for="curl">URL (optional)</label>
                    <input id="curl" type="url" name="url">
                </p>
                <p>
                    <label for="ccomment">Your comment (required)</label>
                    <textarea id="ccomment" name="comment" required></textarea>
                </p>
                <p>
                    <input class="submit" type="submit" value="Submit">
                </p>
            </fieldset>
        </form>
    </div>
</body>
</html>
