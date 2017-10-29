$(document).ready(function () {
	$("#search-user").on('keyup', function (e) {
		var query = e.target.value;
		
		$.ajax({
			url: 'https://api.github.com/users/' + query,
			data: {
				client_id: 'd1e02bbff2be551f22b4',
				client_secret: 'e3d94f53b386074db44b8bcbe625d5e56bbce66a'
			}
		}).done(function (user) {
			// console.log(user);
			var name = user.name,
				avatar_url = user.avatar_url,
				public_repos = user.public_repos,
				profile = user.url;

				if (name == null) {
					name = user.login;
				}
				if (avatar_url == null) {
					avatar_url = "https://findoverwatch.com/images/not-found.png";
				}

			$(".results").html("<h2>" + name + "</h2><img class=\"img-responsive\" src=\"" + avatar_url + "\" alt=\"\" /><ul><li>Public repos: " + public_repos + "</li></ul>");
		});
	});
});