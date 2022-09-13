import mongoose from "mongoose"
import { MotoController } from "../controllers/motoController.js"
import Moto from "../models/modelMoto.js"
import User from "../models/modelUser.js"
import { Config } from "../Config.js"
import { UserController } from "../controllers/userController.js"
const db = "mongodb+srv://" + Config.dbUserName + ":" + Config.dbPassword + "@" + Config.dbClusterName + "/" + Config.dbTestName + "?retryWrites=true&w=majority"

beforeEach(async () => {
    await User.deleteMany()
})
beforeAll(async () => {
    mongoose.connect(db)
})

// la methode afterAll() permet d'executer le bloc de code a l'interieur apres tout les tests
afterAll(async () => {
    await mongoose.connection.close(true); // <-- important
});

/**
* @function MotoController.deleteMoto()
*/

describe('supprimer une moto', () => {//paquet de test

    it('devrait effacer une moto', async () => {//le test
        let moto = new Moto({
            brand: "Kawasaki",
            model: "Versys",
            cylinder: 650
        })
        let user = new User({
            picture: "",
            name: "Ylies",
            firstName: "azouz",
            pseudo: "tazz",
            password: "azertyuiop",
            mail: "azer@azer.fr",
            status: 2,
            eventUser: [],
            motoUser: [moto]
        })
        await user.save()
        let res = await User.find()
        expect(user.motoUser.length).toEqual(1)
        expect(user.motoUser[0].brand).toEqual("Kawasaki")
        expect(user.motoUser[0].model).toEqual("Versys")
        expect(user.motoUser[0].cylinder).toEqual(650)
        await MotoController.deleteMoto(user._id, moto._id)
        res = await User.find()
        expect(res[0].motoUser.length).toEqual(0)
    })
})