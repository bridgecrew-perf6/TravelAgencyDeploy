import {Testimonial} from '../models/Testimoniales.js'

export const guardarTestimonial = async (req,res)=>{

    //? validar

    const {nombre, email, mensaje} = req.body;

    const errores = []

    if (nombre.trim() ===''){
        errores.push({mensaje : "el nombre esta vacio"});
    }

    if (email.trim() ===''){
        errores.push({mensaje : "el correo esta vacio"});
    }

    if (mensaje.trim() ===''){
        errores.push({mensaje : "el mensaje esta vacio"});
    }
    
    if (errores.length > 0){

        //? consultar la base de datos
        const testimoniales = await Testimonial.findAll();

        //? mostrar la vista con errores
        res.render('testimoniales', {
            pagina : 'Testimoniales',
            errores,
            nombre,
            email,
            mensaje,
            testimoniales
        })
    }else{
        //? almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre,
                email,
                mensaje
            });

            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error);
        }
    }

}