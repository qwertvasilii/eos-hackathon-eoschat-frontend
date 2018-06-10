import Backbone from 'backbone';
import Transaction from '../models/Transaction';

export default Backbone.Collection.extend({
    model: Transaction,
    comparator: function(model) {
        return model.seq;
    }
})