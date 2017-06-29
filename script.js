var press = document.getElementById('press');
var info;

function look(){ // request for the searched information
	var data = document.getElementById('search').value;
	var wiki = new XMLHttpRequest();
	
	
	wiki.open('GET', 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ data +'&format=json&origin=*', 'true'); // when working with the wiki API 'origin=*' is important

	wiki.onreadystatechange = function (){
		if (wiki.readyState === XMLHttpRequest.DONE && wiki.status ===200){
			info = JSON.parse(wiki.responseText);
			display();
		}
	};

	wiki.send(null);

}

function display(){  
	console.log(info);
	var searchBar = document.getElementById('searchBar');
	var line = document.querySelector('hr');
	var articleUl = document.getElementById('articles');
	var reply = document.querySelector('h4');
	
	searchBar.style.margin = "0";
	line.style.opacity = "1";
	articleUl.innerHTML = '';
	
	if (info.hasOwnProperty('error')) {
		reply.innerHTML = info.error.info;
		reply.style.color = "red";
	} else{
		reply.style.color = "black";
		reply.innerHTML = "searched: " + '"' + info[0].italics() + '"';		
		info[1].forEach(function(text, index){  // makes a header and description for all information returned
			var articleLi = document.createElement('li');
			var articleHead = document.createElement('h3');
			var descript = document.createElement('p');
			var articleLink = document.createElement('a');
			
			articleHead.innerHTML = text;
			articleLink.href = info[3][index];
			articleLink.target = "_blank"; //opens link in a new window
			descript.innerHTML = info[2][index];
			
			
			articleLink.appendChild(articleHead); //makes the list clickable
			articleLink.appendChild(descript);	
			articleLi.appendChild(articleLink);  
			articleUl.appendChild(articleLi); // adds the list to the existing ul element
			
			setTimeout(function() { //adds fade-in animation class to each element from top to bottom
				articleLi.className = articleLi.className + " show";
			}, index*200);
		});
	}
}

press.addEventListener('click', look); 

enter.addEventListener('keypress', function(e){
      if(e.charCode === 13){
        look();
      }
});