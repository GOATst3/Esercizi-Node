//challange 1

const surprisingFact = "The bumblebee bat is the world's smallest mammal";

console.log('\nmethod 1 \n');
console.log('Surprising Fact: %s\n', surprisingFact)
console.log('\nmethod 2 \n');
console.log(`Surprising Fact: ${surprisingFact}\n`)



//challange 2

const familyTree = [
    {
        name: 'Person 1',
        children: [
            {
                name: 'Person 2',
                children: [
                    {
                        name: 'Person 3',
                        children: [
                            {
                                name: 'Person 4',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

//method 1
console.log('\nmethod 1 \n');
console.dir(familyTree, { depth: null });
//method 2
console.log('\nmethod 2\n');
console.log('Family Tree:',JSON.stringify(familyTree, null, 2));




//challange 3

function importantTask() {
    console.count('call importantTask')
}

importantTask();
importantTask();
importantTask();
importantTask();
console.countReset('call importantTask')
importantTask();
importantTask();