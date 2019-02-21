$(document).ready(function () {
	$('#marketplace--input_package-file input').on('change', function () {
		var parts = this.value.split('/');
		var repoInfo = {};

		if(parts[0].indexOf('http')===0){
			// this was a full url
			var repoInfo = {
				provider: parts[2],
				owner: parts[3],
				repo: parts[4],
			}
		}
		else{
			// entered repo owner/name (eg: user/extension-name)
		}

		//-- only attempt to fetch remote if we have all the parts we need
		if(repoInfo.provider && repoInfo.owner && repoInfo.repo){
			console.log('may be valid?');
		}

		console.log(repoInfo);
		// debugger;
	})
})


