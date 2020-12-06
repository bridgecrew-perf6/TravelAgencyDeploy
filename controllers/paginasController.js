import  {Viaje} from '../models/Viaje.js'
import  {Testimonial} from '../models/Testimoniales.js'
import db from '../config/db.js';

export const paginaInicio = async (req, res)=>{
    //? consultar 3 viajes del modelo viaje
    const promiseDB = []
    promiseDB.push(Viaje.findAll({limit : 3}))
    promiseDB.push(Testimonial.findAll( {limit : 3} ))

    try {
        const resultado = await Promise.all(promiseDB);
        
        res.render('inicio', {
            pagina: "Inicio",
            clase: 'home', 
            viajes: resultado[0],
            testimoniales: resultado[1]
        });

    } catch (error) {
        console.log(error);
    }

}

export const paginaNosotros = (req, res)=>{
    res.render('nosotros', {
        pagina: "Nosotros"
    });
}

export const paginaViajes = async (req, res)=>{
    //? consultar db
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: "Próximos viajes",
        viajes
    });
}

export const paginaTestimoniales =  async (req, res)=>{

    
    try {
        const testimoniales = await Testimonial.findAll();
        
        res.render('testimoniales', {
            pagina: "Testimoniales",
            testimoniales
        });
        
    } catch (error) {
        console.log(error);
    }
}

//? muestra un viaje por slug
export const paginaDetalleViajes = async (req, res)=>{
    const {slug} = req.params;

    try {
        const viaje = await Viaje.findOne({ where: {slug} })
        res.render('viaje', {
            pagina : "Información viaje",
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}

