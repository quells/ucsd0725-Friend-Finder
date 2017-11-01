$(function() {
    if ($("#surveyForm").length > 0) {
        initializeSurvey();
    }
});

function initializeSurvey() {
    var userNameField = $("#userName");
    var userImageField = $("#userImage");

    userImageField.on("change", function() {
        userImageField.attr("class", "");
        console.log(userImageField.val());
        $.get(userImageField.val(), function(response) {
            console.log(response);
        });
    });

    $("#submitSurvey").click(function(e) {
        e.preventDefault();
        if (userNameField.val().length < 1) {
            alert("Please enter your name.");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/api/submit_survey",
            data: $("#surveyForm").serialize(),
            success: function(data) {
                $("#surveyForm").find("input").prop("disabled", true);
                $("#surveyForm").find("button").prop("disabled", true);
                console.log(data);
            }
        });
    });
}