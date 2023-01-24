const yargs = require('yargs')
const fs = require('fs')
const filename = 'todos.json'

let todos = JSON.parse(fs.readFileSync(filename, 'utf-8'))

yargs.version('1.0.0')

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a todo to the list of Todos',
    builder: {
        title: {
            describe: 'Todo title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        let id
        if (todos.length === 0) id = 1
        else id = todos[todos.length-1].id + 1
        if (argv.title === '') return console.log('No es posible agrearg un todo vacío')
        todos.push({ id, title: argv.title, status: false })
        fs.writeFileSync(filename, JSON.stringify(todos, null, 2))
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a todo from the list of Todos',
    builder: {
        id: {
            describe: 'The ID of the todo to be removed',
            demandOption: true,
            type: 'number'
        }
    },
    handler: function(argv) {
        if (argv.id === 0) return console.log('No es posible....')
        if (todos.some(item => item.id === argv.id)) {
            let newTodos = todos.filter(item => item.id !== argv.id)
            fs.writeFileSync(filename, JSON.stringify(newTodos, null, 2))
            console.log('Deleted!')
        } else {
            console.log('error')
        }
    }
})

//Create remove command
yargs.command({
    command: 'list',
    describe: 'List the list of Todos',
    handler: function() {
        // console.log(JSON.parse(fs.readFileSync(filename, 'utf-8')))
        console.log(todos)
    }
})


//Create remove command
yargs.command({
    command: 'update',
    describe: 'List the list of Todos',
    builder: {
        id: {
            describe: 'The ID of the todo to be updated',
            demandOption: true,
            type: 'number'
        }
    },
    handler: function(argv) {
        if (argv.id === 0) return console.log('No es posible....')
        if (todos.some(item => item.id === argv.id)) {
            let index = todos.findIndex(item => item.id === argv.id)
            todos[index].status = true
            fs.writeFileSync(filename, JSON.stringify(todos, null, 2))
            console.log('Updated!')
        } else {
            console.log('error')
        }
    }
})

yargs.parse()