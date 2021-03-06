///If user adds a motes add to the local storage
showNotes();
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (event) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  
  let notes = localStorage.getItem("notes");
  
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }


let myObj = {
  title: addTitle.value,
  text: addTxt.value
}

  notesObj.push(myObj);
  
  localStorage.setItem("notes", JSON.stringify(notesObj));
  
  addTxt.value = "";
  addTitle.value = "";
  console.log(notes);

  showNotes();
});

///Function To show elements from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }


  let html = "";

  notesObj.forEach(function (element, index) {

    ///Here the element is the text we added in the etxt area and index in note number
    ///Simply we are adding this code to the div inside body to make new cards
    html += `
           <div class="noteCard card my-2 mx-2" style="width: 18rem">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">
                        ${element.text}
                    </p>
                    <button id = "${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
           `;
  });

  let notesElm = document.getElementById("notes");
  {
    if (notesObj.length != 0) {
      notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show you! Use "Add a Note Section above to add notes"`;
    }
  }
}


///Function to delete a Note

function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
   /// console.log("Deleted");
};



let search = document.getElementById("searchTxt");

search.addEventListener("input",function(){

    let inputVal = search.value.toLowerCase();


   /// console.log('input event is fired',inputVal);

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }

      ///  console.log(cardTxt);
    });
});



/*Extras
1. Add Title
2.Mark a note as important
3.Sync and host to a web server
*/