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
        setTimeout(() => {
            getContent();
        }, 100); 

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
    
    function getCategories (data, finished, level) {

        if (finished == true) {
            return;
        }
        level = level + 1;
        if (typeof data === "object") {
            let num = 0;
            for(var k in data) {
                console.log(k);
                if (data[k].hasOwnProperty("type")) {
                    dataOut += '<div class="sub-rows hidden-row"><div class="browse-row single-row" data-level="'+level+'"><div class="actual-row"><div class="favorite"><img src="img/star.png" alt="star"></div><div class="browse-row-inner"><div class="browse-row-info"><h3 class="browse-row-name">'+data[k]["name"]+'</h3><div class="browse-row-product-type"><div class="browse-row-product-type-label">Product type:</div><div class="browse-row-product-type-value">'+data[k]["type"]+'</div></div></div><div class="action-group"><a href="#">Select</a></div></div></div></div></div>';
                    if (num == data.lenght) {
                        levelBefore = level;
                        return;
                    }
                } else {
                    if (level != 1) {
                        dataOut += '<div class="sub-rows hidden-row"><div class="browse-row parent-row" data-level="'+level+'"><div class="actual-row clickable-row"><div class="favorite"><img src="img/star.png" alt="star"></div><div class="browse-row-inner"><div class="browse-row-info"><h3 class="browse-row-name">'+data[k]["name"]+'</h3></div><div class="action-group"><img src="img/browse-arrow.png" alt="browse arrow" class="browse-btn-next-cat"></div></div>';
                    } else {
                        dataOut += '<div class="browse-row parent-row" data-level="'+level+'"><div class="actual-row clickable-row"><div class="favorite"><img src="img/star.png" alt="star"></div><div class="browse-row-inner"><div class="browse-row-info"><h3 class="browse-row-name">'+data[k]["name"]+'</h3></div><div class="action-group"><img src="img/browse-arrow.png" alt="browse arrow" class="browse-btn-next-cat"></div></div></div>';
                    }
                    getCategories(data[k]["sub"],finished, level);
                }
                num++;
            }
        } else {
            console.log(data);
            finished = true;
        }

    }
    function getContent() {
        window.dataOut = "";
        window.levelBefore = 1;
        $.getJSON("data.json", function(json) {
            var finished = false;
            getCategories(json, finished, 0);
            dataOut += "</div>";
            $(".browse-content").html(dataOut);
        });
    }
    getContent();
});