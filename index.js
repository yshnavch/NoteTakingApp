var yargs = require('yargs');
var chalk =require('chalk');
var notes =require('./notes.json');
var fs = require('fs');
var notes = JSON.parse(fs.readFileSync('notes.json'));
var repeat="false";

//For adding new notes
function addNotes(title,body){
        notes.forEach((note)=>{
            if(note.title.toLowerCase()==title.toLowerCase()){
                repeat=true;
            }
        })
        if(repeat==="false")
        {            
            notes.push({
                title,
                body
              });
            fs.writeFile("notes.json",JSON.stringify(notes),()=>{
            console.log(chalk.greenBright.italic.bold('New note created!'));
            })
        }
        else{
            console.log(chalk.redBright.italic.bold("OOPS!Title is already taken."))
        }
        
}


//reference from geeks for geeks https://www.geeksforgeeks.org/node-js-yargs-module/#:~:text=Yargs%20module%20is%20used%20for,flexible%20and%20easy%20to%20use.
yargs.command({
    command: 'add',
    describe: 'Adds notes to list',
    builder: {
        title: {
            describe: 'title',
            demandOption: true, 
            type: 'string'     
        },
        body: {  
            describe: 'body',
            demandOption: true,
            type: 'string'
        }
    },
  
    handler(argv) {
        addNotes(argv.title,argv.body);
    }
})

//For removing note
function removeNotes(title){
    notes.forEach((note)=>{
        if(note.title.toLowerCase()==title.toLowerCase()){
            repeat=true;
        }
    });
    if(repeat===true){
        var newList = notes.filter((note)=>{
            return note.title.toLowerCase()!=title.toLowerCase();
        });
        fs.writeFile('notes.json',JSON.stringify(newList),()=>{
            console.log(chalk.greenBright.italic.bold(title +' note removed succesfully!'));

        })
    }
    else{
        console.log(chalk.redBright.italic.bold(title+' Note not found!'));
        console.log(chalk.black.bold('Select a note from following list to remove'));
        displayList();
    }
}
yargs.command({
    command: 'remove',
    describe: 'removes notes from the list',
    builder: {
        title: {
            describe: 'title',
            demandOption: true, 
            type: 'string'     
        },
    },
  
    handler(argv) {
        removeNotes(argv.title);
    }
})

//Displaying notes
function displayList(){
   
    if(notes.length!=0)
    {
        console.log(chalk.bold.magenta.underline(' Your Notes:'));
        notes.forEach((note)=>{
            console.log('> '+ chalk.italic.green(note.title));
        });
    }
    else{
        console.log(chalk.bold.blue('List is empty'));
    }
}

yargs.command({
    command: 'list',
    describe: 'displaying all the notes in the list',
  
    handler(argv) {
        displayList();
    }
})

//Displaying contents of a note
function readNotes(title){
    notes.forEach((note,index)=>{
        if(note.title.toLowerCase()==title.toLowerCase()){
            console.log(chalk.bold.green(note.title +':'));
            console.log(chalk.italic.bold.yellow(notes[index].body));
             repeat ="true";
        }
       
    });
    if(repeat=='false'){
        console.log(chalk.bold.blue(title + ' note not found!'));
        console.log(chalk.black.bold('Select a note from following list to display'));
        displayList();
    }
}

yargs.command({
    command: 'read',
    describe: 'displays content of the note',
    builder: {
        title: {
            describe: 'title',
            demandOption: true, 
            type: 'string'     
        },
    },
  
    handler(argv) {
        readNotes(argv.title);
    }
})
   
yargs.parse()