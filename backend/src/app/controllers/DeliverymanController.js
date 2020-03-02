import * as Yup from 'yup';
import Deliveryman from '../model/Deliveryman';
import File from '../model/File';

class DeliverymanController{

    async index(req,res){
        const deliverymen = await Deliveryman.findAll({
            where:{
                active:true,
            },
            attributes : ['id','name','email','active'],
            include:[{
                model:File,
                as : 'avatar',
                attributes:['id','path','url'],
            }]
        });

        return res.json(deliverymen);
    }

    async store(req,res){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
              .email()
              .required(),
          });
      
          if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Fails' });
          }

          //Verifica se o entregador já está cadastrado na base de dados

          const deliverymanExists = await Deliveryman.findOne({where:{email:req.body.email}});
          if(deliverymanExists){
              return res.json({error:'A deliveryman with this email already exists'});
          }
          const {id,name,email} = await Deliveryman.create(req.body);

          return res.json({
                id,name,email
          });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
          name: Yup.string(),
          email: Yup.string().email(),
          avatar_id: Yup.number(),
        });
    
        if (!(await schema.isValid(req.body))) {
          return res.status(400).json({ error: 'Validation Fails' });
        }
    
        const deliveryman = await Deliveryman.findByPk(req.params.id);
    
        if (!deliveryman) {
          return res.status(400).json({ error: 'Deliveryman not exists' });
        }
    
        const { id, name, email } = await deliveryman.update(req.body);
    
        return res.json({ id, name, email });
      }

    //Esse metodo foi customizado, pois ao deletar o deliveryman, ele nao deve deletar 
    //Apenas o desativa para mater o historico de entregas
    async delele(req,res){
        const deliveryman = await Deliveryman.findByPk(req.params.id);

        if(!deliveryman){
            return res.status(400).json({error:'Deliveryman not exists'});
        }

        deliveryman.active = false;
        await deliveryman.save();

        res.status(200).json(deliveryman);
    }

}

export default new DeliverymanController();