import Deliveryman from '../model/Deliveryman';
import Delivery from '../model/Delivery';
import Recipient from '../model/Recipient';
import File from  '../model/File';

class DeliveryOpenedController {
    async index(req, res) {
        const deliveryman = await Deliveryman.findByPk(req.params.id);
        const { page = 1 } = req.query;
        const deliveryman_id = req.params.id;
        if (!deliveryman) {
            return res.status(400).json({ error: 'Deliveryman does not exist' });
        }
        console.log('ID', deliveryman_id);
        const deliveriesOpened = await Delivery.findAll({
            where: { deliveryman_id, end_date: null, canceled_at: null },
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
            ],
            limit: 10,
            offset: (page - 1) * 10,
        });
        return res.json(deliveriesOpened);
    }
}


export default new DeliveryOpenedController();