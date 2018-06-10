import Backbone from 'backbone';
import Chat from '../models/Chat';

export default Backbone.Collection.extend({
    model: Chat,
    comparator: function(model) {
        return model.seq;
    }
})