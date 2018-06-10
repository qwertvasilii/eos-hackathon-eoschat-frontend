import Marionette from 'backbone.marionette';
import template from './templates/tool-template.jst';
import workshop from '../../controller/appWorkshop';
import eos from '../../../img/eos-seeklogo.com.svg';

export default Marionette.View.extend({
    template: template,
    className: 'col-md-9 input-group',
    attributes: {
        id: 'tool'
    },
    events: {
        'click #send-msg' : 'sendMsg'
    },
    templateContext: {
        eos: eos
    },
    sendMsg: function(){
        let self = this;
        let msg = this.$('#msg-input').val();
        $('#loading-place').html('<i class="fa fa-spinner fa-pulse fa-2x"></i>');
        workshop.sendMessage(msg).then(() => {
            $('#loading-place').html('');
            self.$('#msg-input').val('');
        })
    },
    triggers: {
        'click #transfer' : 'transfer:click'
    }
})