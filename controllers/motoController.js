import Moto from "../models/modelMoto.js"
import User from "../models/modelUser.js"

export class MotoController {
    static async newMoto(moto, user){

        let objectError = {
            errors: []
        }
        const newMoto = new Moto(moto)
        //---------------------------- permet de récupérer les erreurs
        let err = await newMoto.validateSync()
        if (err) {
            for (let i = 0; i < Object.values(err.errors).length; i++) {
                objectError.errors.push(Object.values(err.errors)[i].message);
            }
            return objectError;
        }else{
            await user.motoUser.push(newMoto)
            await user.save()
            return ""
        }

    }

    static async deleteMoto(id, motoId){
        const user = await User.findOne({ _id: id }) //pour sauvegarder ensuite sur l'utilisateur
        let index;
        for (let i = 0; i < user.motoUser.length; i++) { // Nous parcourons le tableau de moto
            if (user.motoUser[i]._id == motoId) { // si l'id de la moto est égale à celle renseigné...
                 index = i; //... On récupère l'id de la moto
            }
        }
        user.motoUser.splice(index, 1) //supprimé l'élèment ciblé
        await user.save() // sauvegarde de la modification 
        return "La moto a été supprimé"
    }
    
    
}