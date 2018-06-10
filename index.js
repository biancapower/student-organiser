const Session = require('./models/Session');

// names of all students
const students = ["Alex", "Andres", "Andrew", "Ash", "Casey", "Cassandra", "Charles", "Chris B", "Chris F", "Chris L", "Dae", "Elouise", "Frank", "Hadi", "Jake", "James", "Jen", "Joseph", "Katie", "Lewis", "Luke", "Lux", "Maryna", "Mat", "Nick", "Punya", "Rafael", "Rhys", "Sam F", "Sam R"];

// number of students per group
let groupSize = 4;

// specify preference for larger or smaller groups when even numbers not possible
const smallOrLarge = "small";

// determine number of groups
let numGroups;

if (smallOrLarge === "small") {
    numGroups = Math.ceil(students.length / groupSize);
    // makes code behave as though groups size is one less
    // this allows rest of code to behave as if 'large' was selected
    groupSize--;
} else {
    numGroups = Math.floor(students.length / groupSize);
}

// determine number of students remaining after even groups are made
const studentsRemaining = Math.abs(students.length - (numGroups * groupSize));

// create new array with names of students shuffled
const shuffledStudents = shuffle(students);

// function to shuffle an array
function shuffle(a) {
    let ret = a.slice();
    for (let i = ret.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ret[i], ret[j]] = [ret[j], ret[i]];
    }
    return ret;
}

function group(arrOfStudents, groupSize) {

    let myGroups = [];

    // create evenly distributed groups
    for (let j = 0; arrOfStudents.length > studentsRemaining; j++) {
        let group = [];

        for (let i = 0; i < groupSize; i++) {
            group.push(arrOfStudents.pop());
        }
        
        myGroups.push(group);
        
    }
    
    // add remaining students evenly to groups
    for (let k = 0; arrOfStudents.length > 0; k++) {
        myGroups[k].push(arrOfStudents.pop());
    }
    
    return myGroups;

}

const myGroups = group(shuffledStudents, groupSize);

console.log(myGroups);

console.log("Enter a session name to store this session: ");

const stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    // console.log("you entered: [" + 
    //     d.toString().trim() + "]");

    Session.create({
        name: d.toString().trim(),
        date: new Date(),
        groups: myGroups,
    }).then((session) => {
        console.log(`You have saved the session ${session.name}`);
    });

});

