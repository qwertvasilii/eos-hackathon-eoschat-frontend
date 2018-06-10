import Backbone from 'backbone';
import ChatList from '../collections/ChatList';

export default Backbone.Model.extend({
    initialize: function(){
        this.attributes.messages = new ChatList();
    },
    idAttribute: "account_name"
})