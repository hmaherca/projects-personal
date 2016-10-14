const fs = require('fs');

fs.readFile('quote.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        //using String.split() to create an array of words
        const words = data.split(' ');
        //Loop through array of words
        for (let i = 0; i < words.length; i++) {
            //check the first letter of each word to see if it is 'b'
            if (words[i].charAt(0).toLowerCase() === 'b') {
                words[i] = 'BrainStation'; //replace word with BrainStation if word starts with 'b'
            }
        }
        //Join words array back into a single string for writing to file
        const newContent = words.join(' ');

        //Alternatively, using regular expressions to find words that start with 'b'
        const newString = data.replace(/\bb\w+/gi,'BrainStation');

        //Write modified string to file, note that this happens inside the callback of fs.readFile()
        fs.writeFile('quote_virus.txt', newContent, 'utf8', (err) => {
            if (err) {
                console.log(err);
            }
        })

        fs.writeFile('quote_virus2.txt', newString, 'utf8', (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
})