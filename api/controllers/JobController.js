/**
 * JobController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	async create(req, res) {
    try {
      const data = req.body;
      const job = await Job.create(data);
      const users = await User.find({ isDeleted: false });
      users.forEach(async (user) => {
        const emailPayload = { email: user.email, type: 'new-opening'}
        await EmailService.sendEmail(emailPayload);
      });
      return res.status(201).send({ message: 'Job Created', data: job });
    } catch (err) {
      return { responseCode: 400, err };
    }
  },
  async read(req, res) {
    try {
      const id = req.params.id;
      const criteria = { id, isDeleted: false };
      const job = await Job.findOne(criteria);
      if (!job) {
        return res.status(404).send({ error: 'Job does not exist' });
      }
      return res.status(200).send({ message: 'Job retrieved successfully', data: job });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async list(req, res) {
    try {
      const criteria = { isDeleted: false };
      const jobs = await Job.find(criteria);
      return res.status(200).send({ message: 'Jobs retrieved successfully', data: jobs });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const criteria = { id, isDeleted: false };
      const job = await Job.update(criteria, data);
      if (!job.length) {
        return res.status(404).send({ error: 'Job does not exist' });
      }
      return res.status(200).send({ message: 'Job successfully updated', data: job[0] });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      const criteria = { id, isDeleted: false };
      const job = await Job.update(criteria, { isDeleted: true });
      if (!job.length) {
        return res.status(404).send({ error: 'Job does not exist' });
      }
      return res.status(200).send({ message: 'Job successfully deleted', data: job[0] });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};

