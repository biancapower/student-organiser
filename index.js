// names of all students
const students = ["Alex", "Andres", "Andrew", "Ash", "Casey", "Cassandra", "Charles", "Chris B", "Chris F", "Chris L", "Dae", "Elouise", "Frank", "Hadi", "Jake", "James", "Jen", "Joseph", "Katie", "Lewis", "Luke", "Lux", "Maryna", "Mat", "Nick", "Punya", "Rafael", "Rhys", "Sam F", "Sam R"];

// number of students per group
const groupSize = 3;

// create new array with names of students shuffled
const shuffledStudents = shuffle(students);

// function to shuffle an array
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

function group(arrOfStudents, groupSize) {
    // console.log(`Students: ${arrOfStudents}`);

    let group1 = [];

    for (i = 0; i < groupSize; i++) {
        group1.push(arrOfStudents.pop());
    }
    
    console.log(group1);
    // console.log(`Students: ${arrOfStudents}`);
}

group(shuffledStudents, groupSize);
