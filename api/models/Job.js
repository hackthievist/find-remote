/**
 * Job.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    companyName: {
      type: 'string',
      required: true,
    },
    role: {
      type: 'string',
    },
    link: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['open', 'closed'],
    },
    location: {
      type: 'json',
    },
    category: {
      type: 'string',
    },
    level: {
      type: 'string',
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    }
  },
  validationMessages: {
    title: {
      required: 'Title is required',
    },
    description: {
      required: 'Description is required',
    },
    organization: {
      required: 'Organization is required',
    },
  },
};

