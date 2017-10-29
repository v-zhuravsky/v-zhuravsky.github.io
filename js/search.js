$(document).ready(function () {
	var category = window.location.hash;
	if (category == "#frontend") {
		category = "Frontend";
		$("#category").html(category);
	} else if (category == "#backend") {
		category = "Backend";
		$("#category").html(category);
	} else if (category == "#speedcubing") {
		category = "Speedcubing";
		$("#category").html(category);
	} else if (category == "#life") {
		category = "My life";
		$("#category").html(category);
	} else {
		window.location = "index.html";
	}
	console.log(category);

	window.addEventListener('hashchange', hashchange);

	function hashchange(){ 
		var cat = location.hash;
		cat = cat.substring(1);
		window.location.reload();
	}

	var posts = $(".posts"),
		helper = $(".helper");

	$.ajax({
		url: "db/articles.json"
	}).done(function(data) {
		var found = 0;
		for (var i = 0; i < data.articles.length; i++) {
			for (var j = 0; j < data.articles[i].categories.length; j++) {
				if (data.articles[i].categories[j]['category-name'] == category) {
		    		var source = '<div class="article"><div class="top-article"><h1><a href="{{article-link}}">{{title}}</a></h1><p>{{text}}</p></div><div class="bottom-article"><p class="date"><a href="#">{{date}}</a></p>{{#each categories}}<p class="category"><a href="search.html#{{cat-link}}">{{category-name}}</a></p>{{/each}}</div></div>';
					var template = Handlebars.compile(source);
					var html = template(data.articles[i]);
					posts.append(html);
					found++;
			    }
			}
		}

		if (found == 0 || found < 1) {
			helper.html("<h1>Here are no articles in this category</h1>");
		} else {
			helper.addClass("dsp-none");
		}
	})
});