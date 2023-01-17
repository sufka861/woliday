const express = require('express');
const app = require('./app');
const {groupFamiliesIntoSquads} = require("./logic/squad.grouping.logic");
const port = process.env.PORT || 3000;


app.listen(port, ()=>{
    console.log(`App running on port ${port}`);

    const {groupUsersIntoSquads, groupFamiliesIntoSquads} = require("./logic/squad.grouping.logic");
    // groupUsersIntoSquads();
    groupFamiliesIntoSquads()
})

