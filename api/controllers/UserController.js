/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  async subscribe(req, res) {
    try {
      const data = req.body;
      const user = await User.create(data);
      const emailPayload = {
        email: user.email,
        type: 'welcome-email',
      };
      await EmailService.sendEmail(emailPayload);
      return res.status(201).send({
        message: 'User subscribed successfully',
        data: user
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async unsubscribe(req, res) {
    try {
      const id = req.params.id;
      const criteria = { id, isDeleted: false };
      const user = await User.update(criteria, { isDeleted: true });
      if (!user.length) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).send({
        message: 'User unsubscribed successfully',
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};
