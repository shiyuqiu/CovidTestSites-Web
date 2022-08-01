// Structure
const form = document.querySelector("form");
const locationInput = document.querySelector(".location");
const nameInput = document.querySelector(".name");
const ratingInput = document.getElementsByName('rate');
const descriptionInput = document.querySelector(".description");
var button = document.querySelector("button");


//OBJECT SETUP

let comments = {
	"commentsList": []
}


// Event Handlers

const addNewComments = (e) => {
  e.preventDefault();
  
  // variable for values
  const newLocation = locationInput.value;
  const newName = nameInput.value;
  var selectedRating = Array.from(ratingInput).find(radio => radio.checked);
  const newRating = selectedRating.value;
  const newDescription = descriptionInput.value;
  
  // store in a JSON object
  commentsObject = {
		location: newLocation,
		name: newName,
        cleanliness: newRating,
        description: newDescription,
		completed: false,
	}
  

	// displayContact(commentsObject);
  
  //add object to array
	comments.commentsList.push(commentsObject);
    console.log(comments)
  //store in local storage
	localStorage.setItem("comments", JSON.stringify(comments));

	//clear form
	form.reset();

    //Print result
    let display = document.querySelector('.display')
    let commentsCollection = document.createElement('table')
    display.append(commentsCollection)
    console.log(comments.commentsList.length)
    // printTable(commentsObject);
    var validation = document.createElement("h2")
    let valDisplay = document.querySelector('.validation-space')
    validation.textContent="✓ Thank you for submiting!"
    validation.classList.add("validation");
    while (valDisplay.firstChild){
        valDisplay.removeChild(valDisplay.firstChild)
      }
    valDisplay.appendChild(validation)
    console.log(display.querySelector('table'))
    if (display.querySelector('tbody') == null){
        printTable(commentsObject)
    } else {
        printBathroom(commentsObject)
    }

    // printcomments()

}

function printcomments(comments){
    let display = document.querySelector('.display')
    var row = document.createElement("tr");
    
    for (var i = 0; i < 4; i++) {
    
      var cell = document.createElement("td");
      if (i==0) {
        var cellText = document.createTextNode(
        comments.location);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell.classList.add("location");
      } else if (i==1){
        var cellText = document.createTextNode(
       comments.name);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell.classList.add("name");
      } else if (i==2){
        var cellText = document.createTextNode(
            drawStar(comments.cleanliness) + 
            comments.cleanliness
        );
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell.classList.add("cleanliness");
      } else if (i==3){
        var cellText = document.createTextNode(
        comments.description);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell.classList.add("description");
    }
    } 
    if (display.querySelector('tbody') == null){
        printTable(comments)
    }else{
        display.querySelector('tbody').appendChild(row);

    }
    
}


function printTable(comments){
        let display = document.querySelector('.display')
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var headerRow = document.createElement("tr");
        tblBody.appendChild(headerRow);
        var header1 = document.createElement("th");
        var header2 = document.createElement("th");
        var header3 = document.createElement("th");
        var header4 = document.createElement("th");
        var row = document.createElement("tr");
        for (var i = 0; i < 4; i++) {
            // create element <td> and text node 
            //Make text node the contents of <td> element
     
            var cell = document.createElement("td");
            if (i==0) {
              var cellText = document.createTextNode(
              comments.location);
              cell.appendChild(cellText);
              row.appendChild(cell);
              cell.classList.add("location");
            } else if (i==1){
              var cellText = document.createTextNode(
              comments.name);
              cell.appendChild(cellText);
              row.appendChild(cell);
              cell.classList.add("name");
            } else if (i==2){
              var cellText = document.createTextNode(
                  drawStar(comments.cleanliness) + 
                  comments.cleanliness
              );
              cell.appendChild(cellText);
              row.appendChild(cell);
              cell.classList.add("cleanliness");
            } else if (i==3){
              var cellText = document.createTextNode(
              comments.description);
              cell.appendChild(cellText);
              row.appendChild(cell);
              cell.classList.add("description");
          }
          } 
        header1.textContent="Location"
        header2.textContent="Name"
        header3.textContent="Cleanliness"
        header4.textContent="Description"
        headerRow.appendChild(header1);
        headerRow.appendChild(header2);
        headerRow.appendChild(header3);
        headerRow.appendChild(header4);
        // put <table> in the <body>
        // tbl border attribute to 
        tbl.setAttribute("border", "2");
        tblBody.appendChild(row);
        tbl.appendChild(tblBody);
        display.appendChild(tbl);
   
    // append the <tbody> inside the <table>
}




function drawStar(int){
    var stars = " "
    if (int == 1){
        stars =  "★"
    } else if (int == 2){
        stars =  "★★"
    } else if (int == 3){
        stars =  "★★★"
    } else if (int == 4){
        stars =  "★★★★"
    } else if (int == 5){
        stars =  "★★★★★"
    } 
    return stars
}


function pageLoadFn(){
    if (localStorage.getItem('comments')==null){
        return
    } else {
            comments = JSON.parse(localStorage.getItem('comments'))
            comments.commentsList.forEach(printComments)
    }
}

pageLoadFn()



form.addEventListener("submit", addNewComments);