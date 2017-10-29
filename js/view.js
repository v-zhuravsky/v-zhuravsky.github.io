$(document).ready(function () {

	var id = window.location.hash;
	id = id.substring(1);

	var postv = $(".posts");

	window.addEventListener('hashchange', hashchange);

	function hashchange(){ 
		var id = location.hash;
		id = id.substring(1);
		window.location.reload();
	}

	$.ajax({
		url: "db/articles.json"
	}).done(function(data) {
		var found = 0;
		for (var i = 0; i < data.articles.length; i++) {
			if (data.articles[i].id == id) {
	    		var source = '<div class="article"><div class="top-article"><h1><a href="{{article-link}}">{{title}}</a></h1><p>{{text}}</p></div><div class="bottom-article"><p class="date"><a href="#">{{date}}</a></p>{{#each categories}}<p class="category"><a href="search.html#{{cat-link}}">{{category-name}}</a></p>{{/each}}</div></div>';
				var template = Handlebars.compile(source);
				var html = template(data.articles[i]);
				postv.append(html);
				found++;
		    }
		}
		if (found == 0) {
			window.location = "index.html";
		}
	})
});