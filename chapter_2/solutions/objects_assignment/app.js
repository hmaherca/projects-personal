/*
This solution just has the basic JavaScript functionality for the Entry and Journal Objects.
Connecting these objects to your HTML can be done in a variety of ways, and examples of this will be shown when we revisit this assignment with Express.
*/
function Entry (title = "", content = "" , author = ""){
    this.title = title;
    this.content = content;
    this.author = author;
}

function Journal (title = ""){
    this.title = title;
    this.entries = [];

    this.addEntry = function(title,content,author){
        this.entries.push(new Entry(title,content,author));
    }

    this.displayEntries = function(){
        this.entries.forEach((entry) => {
            console.log(`Title: ${entry.title}`);
            console.log(entry.content);
            console.log(`By: ${entry.author}`);
        })
    }
}

let journal1 = new Journal('New Journal')
console.log(journal1) // Journal has no entries at this point

journal1.addEntry('Entry 1','Things that happened','A Person');
console.log(journal1) // Journal now has 1 entry in the entries array

journal1.addEntry('Entry 2','More things happened','A Person');
journal1.addEntry('Entry 3','Even more things','Another Person');
journal1.displayEntries(); // Journal now has 3 entries, using the display method to log all entries
