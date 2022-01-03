$(document).ready(function () {

    $('body').on('click', '.clickable-row', function() {

        var actualrow = $(this);
        var parentrow = $(this).parent();

        if (parentrow.hasClass("parent-row")) {

            
            $('.actual-row').removeClass("shown-row");
            $('.actual-row').addClass("hidden-row");

            var dataid = parentrow.attr("data-level");
            
            actualrow.removeClass("shown-row");
            actualrow.addClass("hidden-row");

            var nextrow = $(this).closest(".browse-row").children(".sub-rows");
            nextrow.removeClass("hidden-row");
            nextrow.addClass("shown-row");

            if (actualrow.hasClass("hidden-row") == false) {
                actualrow.addClass("hidden-row");
            }

            if (nextrow.children(".browse-row").children(".actual-row").hasClass("hidden-row")) {
                nextrow.children(".browse-row").children(".actual-row").removeClass("hidden-row");
                nextrow.children(".browse-row").children(".actual-row").addClass("shown-row");
            }

            var categoryName = actualrow.children(".browse-row-inner").children(".browse-row-info").children(".browse-row-name").html();

            if ($(".browse-container-header").hasClass("browse-header-extended") == false) {

                $(".browse-container-header").addClass("browse-header-extended");
                $(".browse-container-header h2").html("<span><a class='browse-cat-switch' data-level='"+dataid+"'>" + categoryName + "</a></span>");

            } else {

                $(".browse-container-header").addClass("browse-header-extended");
                var current = $(".browse-container-header h2").html();
                $(".browse-container-header h2").html(current  + "<span><a class='browse-cat-switch' data-level='"+dataid+"'>" + categoryName + "</a></span>")
            }

        }

    });

    $('body').on('click', '.browse-container-home', function(e) {

        e.preventDefault();
        $('.form-browse').load(document.URL +  '  .form-browse');

    });

    $('body').on('click', '.browse-cat-switch', function(e) {

        var id = $(this).attr("data-level");
        id = parseInt(id) + 1;

        var html = "<span>" + this.outerHTML + "</span>";
        var newHeader = $(".browse-container-header h2").html().split(html,1);
        $(".browse-container-header h2").html(newHeader + html);

        $('.actual-row').removeClass("shown-row");
        $('.actual-row').addClass("hidden-row");
        $('.sub-rows').removeClass("shown-row");
        $('.sub-rows').addClass("hidden-row");

        $('*[data-level="'+id+'"]').parents(".sub-rows").removeClass("hidden-row");
        $('*[data-level="'+id+'"]').parents(".sub-rows").addClass("shown-row");
        $('*[data-level="'+id+'"]').children(".actual-row").removeClass("hidden-row");
        $('*[data-level="'+id+'"]').children(".actual-row").addClass("shown-row");

    });
});