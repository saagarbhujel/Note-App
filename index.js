const newNoteBtn = document.getElementById("new-btn");
const noteContainerEl = document.getElementById("note-container")

getNotes().forEach( (note) => {  //select each note from local storage and sabai note lai baira lyauna (body ma)
    const noteEL = createNewNote(note.id, note.content)
    noteContainerEl.insertBefore(noteEL, newNoteBtn)
});

function createNewNote(id, content) {
  console.log(id, content);

  const element = document.createElement("textarea");  //used to make input area
  element.classList.add("note");  //used to give class name
  element.placeholder=("Empty Note");  //placeholder
  element.value = content;

//line 19-26 and 37-42 delete element
 
  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");

    if (warning) {
      deleteNote(id, element);
    }
    
  });


//line 30-35 and 45-52 is used to update the note (realtime update)
  element.addEventListener("input",()=>{
    updateNote (id, element.value)
  })

  return element
}


function deleteNote(id , element) {
    const notes = getNotes().filter((note)=>note.id!=id)
    saveNote(notes)
    noteContainerEl.removeChild(element)

}

function updateNote (id, content){
    const notes = getNotes()
    const target = notes.filter((note)=>note.id === id )[0]
    target.content= content
    saveNote(notes)


}

//line 56 - 80 is used to add new notes 

function addNote() {
  // console.log("addNote")

  const notes = getNotes()

  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  // console.log(noteObj)

  //line 69 and 70 is used to insert note element before button
  const noteElement = createNewNote(noteObj.id, noteObj.content);
  noteContainerEl.insertBefore(noteElement, newNoteBtn)

  notes.push(noteObj)
  saveNote(notes)
}

//to save in local storage
function saveNote(notes){
    localStorage.setItem("note-app", JSON.stringify(notes))
}

function getNotes(){
  return  JSON.parse(localStorage.getItem("note-app") || "[]")
}

newNoteBtn.addEventListener("click", addNote);
