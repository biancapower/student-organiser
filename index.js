// names of all students
const students = ["Alex", "Andres", "Andrew", "Ash", "Casey", "Cassandra", "Charles", "Chris B", "Chris F", "Chris L", "Dae", "Elouise", "Frank", "Hadi", "Jake", "James", "Jen", "Joseph", "Katie", "Lewis", "Luke", "Lux", "Maryna", "Mat", "Nick", "Punya", "Rafael", "Rhys", "Sam F", "Sam R"];

// number of students per group
const groupSize = 4;

// determine number of groups
const numGroups = Math.floor(students.length / groupSize);

// determine number of students remaining after even groups are made
const studentsRemaining = students.length - (numGroups * groupSize);

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
    
    // assign remaining students to groups
    for (let k = 0; arrOfStudents.length > 0; k++) {
        myGroups[k].push(arrOfStudents.pop());
    }

    console.log(myGroups);

}

group(shuffledStudents, groupSize);
