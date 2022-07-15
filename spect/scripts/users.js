db.Users.insertMany([{
    email: "client02@yopmail.com",
    firstName: "Client Dos",
    lastName: "Testing",
    status: {
        value: 1,
        description: 'Creado por base de datos'
    },
    auditProperties: {
        dateCreate: new Date(),
        dateUpdate: null,
        userCreate: '::script::',
        userUpdate: null,
        activeRecord: true
    }
},{
    email: "client01@yopmail.com",
    firstName: "Client Uno",
    lastName: "Testing",
    status: {
        value: 1,
        description: 'Creado por base de datos'
    },
    auditProperties: {
        dateCreate: new Date(),
        dateUpdate: null,
        userCreate: '::script::',
        userUpdate: null,
        activeRecord: true
    }
}])