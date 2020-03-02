// Aqui usa alias pois espota default
import * as Yup from 'yup';
import Recipient from '../model/Recipient';

class RecipientController {
  async index(req, res) {
    const recipient = await Recipient.findAll({
      attributes: ['id','name', 'street', 'complement', 'number'],
    });

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string()
        .required()
        .min(2)
        .max(10),
      city: Yup.string().required(),
      code_zip: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation Fails!' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      zip_code,
    } = await Recipient.create(req.body);
    return res.json({
      id,
      name,
      street,
      number,
      complement,
      zip_code,
    });
  }

  async update(req, res) {
    const recipientId = req.params.id;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string()
        .required()
        .min(2)
        .max(10),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const recipient = await Recipient.findByPk(recipientId);
    if (!recipient)
      return res.status(400).json({ error: 'Recipient not found' });

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }
}

export default new RecipientController();
