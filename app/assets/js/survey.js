$(function() {
    $(".modal").modal();
    if ($("#surveyForm").length > 0) {
        initializeSurvey();
        // testModal();
    }
});

function testModal() {
    var data = {
        closestMatch: {
            name: "Kai Wells",
            image: "https://avatars3.githubusercontent.com/u/3256759?s=460&v=4",
            answers: [1,2,3,4,5,4,3,2,1,2]
        },
        matchScore: 5
    };

    updateModal(data);
    $("#compatibilityResults").modal("open");
}

function updateModal(data) {
    $("#matchName").text(data.closestMatch.name);

    $("#matchImage").on("error", function() {
        $("#matchImage").attr("class", "hide");
        $("#matchNoImage").attr("class", "material-icons");
    });
    $("#matchImage").on("load", function() {
        $("#matchImage").attr("class", "");
        $("#matchNoImage").attr("class", "hide");
    });
    $("#matchImage").attr("src", data.closestMatch.image);

    var matchPercent = Math.round(100 - 2.5 * data.matchScore);
    $("#matchPercent").text(`${matchPercent}% Match`);

    var favValue = data.closestMatch.answers.reduce(function(a, b) { return Math.max(a, b) });
    var dirIndex = data.closestMatch.answers.indexOf(favValue);
    var director = $("#director-" + dirIndex).text().split("(")[0];
    $("#matchFavorite").text(`Favorite Director: ${director}`);
}

function initializeSurvey() {
    var userNameField = $("#userName");
    var userImageField = $("#userImage");

    userImageField.on("change", function() {
        userImageField.attr("class", "");
        userImageURL = userImageField.val();
        if (userImageURL.length < 1) {
            userImageField.data("validURL", "true");
            return;
        }
        userImageField.data("validURL", "false");

        var testImage = $("<img>");
        testImage.src = userImageURL;
        testImage.load(userImageURL, function() {
            userImageField.data("validURL", "true");
        });
    });

    $("#submitSurvey").click(function(e) {
        e.preventDefault();
        if (userNameField.val().length < 1) {
            alert("Please enter your name.");
            return;
        }
        if (userImageField.data("validURL") === "false") {
            alert("Please enter a valid profile image URL or leave that field empty.");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/api/submit_survey",
            data: $("#surveyForm").serialize(),
            success: function(data) {
                $("#surveyForm").find("input").prop("disabled", true);
                $("#surveyForm").find("button").prop("disabled", true);

                updateModal(data);
                $("#compatibilityResults").modal("open");
            }
        });
    });
}
