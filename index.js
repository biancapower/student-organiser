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
    let count = 0;

    // create evenly distributed groups
    for (let j = 0; count < (arrOfStudents.length - studentsRemaining); j++) {
        let group = [];

        for (let i = 0; i < groupSize; i++) {
            group.push(arrOfStudents[count]);
            count++;
        }
        
        myGroups.push(group);
        
    }
    
    // add remaining students evenly to groups
    for (let k = 0; count < arrOfStudents.length; k++) {
        myGroups[k].push(arrOfStudents[count]);
        count++;
    }

    return myGroups;

}

function maxClashes(groups, undesireablePairings) {
    const countClashes = (group) => {
        let countClashes = 0;
        for (let i = 0; i < group.length; i++) {
            for (let j = i + 1; j < group.length; j++) {
                if (group[i] in undesireablePairings && undesireablePairings[group[i]].has(group[j])) {
                    countClashes++;
                }
            }
        }
        return countClashes;
    };

    return Math.max(...groups.map(countClashes)); 
}

function createBestGroups(students, groupSize, undesireablePairings) {

    // create new array with names of students shuffled
    const shuffledStudents = shuffle(students);
    let bestGroup = group(shuffledStudents, groupSize);
    console.log("****");    
    let bestClashes = maxClashes(bestGroup, undesireablePairings);
    console.log("+++");    

    let i = 0;

    while (bestClashes > 0 && i < 1000000) {
        const shuffledStudents = shuffle(students);
        const thisGroup = group(shuffledStudents, groupSize);
        const clashes = maxClashes(thisGroup, undesireablePairings);
        
        // console.log(clashes);
        
        if (clashes < bestClashes) {
            bestGroup = thisGroup;
            bestClashes = clashes;            
        }

        i++;
    }
    console.log(bestClashes, i);
    return bestGroup;
}

function getUndesireablePairings() {
    return Session.find().then((sessions) => {
        const pairings = {};

        for (let i = 0; i < students.length; i++) {
            pairings[students[i]] = new Set();
        }

        for (let i = 0; i < sessions.length; i++) {
            const groups = sessions[i].groups;

            for (let j = 0; j < groups.length; j++) {
                for (let k = 0; k < groups[j].length; k++) {
                    for (let l = k + 1; l < groups[j].length; l++){
                        pairings[groups[j][k]].add(groups[j][l]);
                        pairings[groups[j][l]].add(groups[j][k]);
                    }
                }
            }
        }
        return pairings;
    });
}

getUndesireablePairings().then((undesireablePairings) => {
    console.log(undesireablePairings);
    const myGroups = createBestGroups(students, groupSize, undesireablePairings);
    
    
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
})




