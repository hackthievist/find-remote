/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true, 
      email: true,
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    }
  },
  validationMessages: {
    name: {
      required: 'Name is required',
    },
    email: {
      required: 'Email is required',
      email: 'Valid email is required',
    },
  },
};

