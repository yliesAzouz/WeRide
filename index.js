import express from 'express';
import mongoose from "mongoose";
import session from "express-session";
import userRouter from './router/routerUser.js';
import eventRouter from './router/routerEvent.js';
import motoRouter from './router/routerMoto.js';
import adminRouter from './router/routerAdmin.js';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv/config'


const app = express();
app.use(fileUpload({
    createParentPath: true
}));
const router = express.Router()
const database = "mongodb+srv://" + process.env.dbUserName + ":" + process.env.dbPassword + "@" + process.env.dbClusterName + "/" + process.env.dbNameDatabase + "?retryWrites=true&w=majority"

// ----------------------------------------connexion mongose
mongoose.connect(database, err => {
    if (err) {
        console.log("erreur de connexion" + err)
    } else {
        console.log('connected at mongodb')
    }
})


//-----------------------------------------création de session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))


//-------------------------------------------------remplace bodyParser
app.use(express.urlencoded({ extended: true }));

//-----------------------------------dossier static
app.use(express.static('./assets'));

//------------------------------------route initialisation
app.use(router)
app.use(userRouter) 
app.use(eventRouter)
app.use(motoRouter)
app.use(adminRouter)

//----------------------------------------lancement de serveur
app.listen(8084, () => {
    console.log('le serveur a démarré')
})
