import { Op } from 'sequelize';
import Deliveryman from '../model/Deliveryman';
import Delivery from '../model/Delivery';
import Recipient from '../model/Recipient';
import File from  '../model/File';


class DeliveryCompletedController {
    async index(req, res) {
        const deliveryman = await Deliveryman.findByPk(req.params.id);
        const { page = 1 } = req.query;
        const deliveryman_id = req.params.id;
        if (!deliveryman) {
            return res.status(400).json({ error: 'Deliveryman does not exist' });
        }
        const deliveriesClosed = await Delivery.findAll({
            where: { deliveryman_id,canceled_at: null, end_date :{[Op.ne]:null}},
            order: ['id'],
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'name',
                        'street',
                        'number',
                        'city',
                        'state',
                        'zip_code',
                    ]
                },
                {
                    model: File,
                    as:'signature',
                    attributes:[
                        'id',
                        'path',
                        'url',
                    ]
                }
            ],
            limit: 10,
            offset: (page - 1) * 10,
        });
        return res.json(deliveriesClosed);
    }
}


export default new DeliveryCompletedController();