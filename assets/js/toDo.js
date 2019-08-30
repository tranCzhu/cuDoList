if (jQuery) {
    console.log("jQuery connected");
} else {
    console.log("jQuery not connected");
}

$(document).ready(function() {
    // For user input
    // When input clicked, put blue border
    // when user clicks elsewhere, remove blue border
    // Original solution: (with stopPropagation)
    // $("input").on("click", function(event) {
    //     $(this).addClass("emphasis");
    //     console.log("ths line");
    //     event.stopPropagation();
    // });
    // $("html").click(function() {
    //     $("input").removeClass("emphasis");
    // });
    // cons of stopPropagation(): https://css-tricks.com/dangers-stopping-event-propagation/
    // current solution
    $(document).on("click", function(event) {
        if (!$(event.target).closest("input").length) {
            $("input").removeClass("emphasis");
        } else {
            $("input").addClass("emphasis");
        }
    });
    // when user hovers, toggle effect
    $("input").hover(function() {
        $(this).addClass("emphasis");
    }, function() {
        $(this).removeClass("emphasis");
    });
    // When + button clicked, toggle display of input
    $("#addBtn").on("click", function() {
        $("input").toggle("slow");
    });

    // For existing tasks
    // When user clicks, cross the task
    $("ul").on("click", "li", function() {
        $(this).children(".text").toggleClass("finished");
        $(this).children(".like").toggleClass("disp");
    });
    // When user clicks delete, remove task
    $("ul").on("click", "li .btnContainer", function(event) {
        $(this).parent().fadeOut(500, function() {
            $(this).remove();
        });
        event.stopPropagation();
    });

    // For new input
    // When user hits enter, input gets submitted
    $("#newTask").keypress(function(e) {
        if (e.which === 13){
            // submit on enter
            var newTask = $(this).val();
            $(this).val("");
            // append newTask to the end of class
            $("ul").append(
                "<li><span class=\"btnContainer\">\
                <img class=\"removeBtn\" src=\"assets/icon/iconfinder_icon-26-trash-can_314863.svg\">\
                </span><span class=\"text\">" + newTask + 
                "</span><img class=\"like\" src=\"assets/icon/iconfinder_Instagram_UI-14_2315581.svg\"></img></li>"
            );
        }
    });
    // When all tasks are removed or crossed out, congratulate user


});
// if ($("li").length === 0) {
//     console.log($("li"));
//     console.log("yayyyk");
//     $("input").attr("placeholder", "Congrats!");
// };

// if (!$("li".hasClass("finished"))) {
//     console.log("yuck");
// }

// LESSONS LEARNED:
// put jQuery codes inside $(document).ready(function() {
// }); so that it will execute automatically when html finished loading

// use selector.on(event, selector, function) if you want all POTENTIAL elements (i.g. stuff that you append later) of the specific
// class to have the effect

// this.val is not valid!!! this.val() is valid because val() returns the value, val is a function that needs to be called with ()