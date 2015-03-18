function updateListVisibility(e) {
	var el = e.target;
	var text = el.textContent;
	if (el.class == 'glyphicon glyphicon-chevron-right') {
		alert(text + ": CHECKED");
	} else {
		alert(text + ": NOT CHECKED");
	}
}

function hideListItems(e) {
	var el = e.target;
}

var listEl = document.getElementById('list');
listEl.addEventListener('click', function(e) {
	updateListVisibility(e);
}, false);