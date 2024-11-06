const mongoose = require('mongoose');

const burnSchema = new mongoose.Schema({
  transactionHash: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  sender: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      return {
        txHash: ret.transactionHash,
        amount: ret.amount,
        timestamp: ret.timestamp.getTime(),
        sender: ret.sender
      };
    }
  }
});

module.exports = mongoose.model('Burn', burnSchema); 
