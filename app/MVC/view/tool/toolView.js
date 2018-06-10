import Marionette from 'backbone.marionette';
import template from './templates/tool-template.jst';
import workshop from '../../controller/appWorkshop';

export default Marionette.View.extend({
    template: template,
    className: 'col-md-9 input-group',
    attributes: {
        id: 'tool'
    },
    events: {
        'click #send-msg' : 'sendMsg'
    },
    sendMsg: function(){
        let msg = this.$('#msg-input').val();
        workshop.sendMessage(msg);
    },
    triggers: {
        'click #transfer' : 'transfer:click'
    }
})