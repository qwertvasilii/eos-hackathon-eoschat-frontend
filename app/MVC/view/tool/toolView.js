import Marionette from 'backbone.marionette';
import template from './templates/tool-template.jst';
import workshop from '../../controller/appWorkshop';
import eos from '../../../img/eos-seeklogo.com.svg';

export default Marionette.View.extend({
    template: template,
    className: 'col-md-9 input-group',
    attributes: {
        id: 'tool',
        style: 'display: none;'
    },
    events: {
        'click #send-msg' : 'sendMsg',
        'keyup #msg-input' : 'keyup'
    },
    templateContext: {
        eos: eos
    },
    initialize: function(){
    },
    unblock: function(){
        this.$('#msg-input').removeAttr('disabled');
        this.$('#send-msg').removeAttr('disabled');
        this.$('#transfer').removeAttr('disabled');
    },
    block: function(){
        this.$('#msg-input').attr('disabled', 'true');
        this.$('#send-msg').attr('disabled','true');
        this.$('#transfer').attr('disabled', 'true');
    },
    sendMsg: function(){
        let self = this;
        let msg = this.$('#msg-input').val();
        if (msg) {
            $('#loading-place').html('<i class="fa fa-spinner fa-pulse fa-2x"></i>');
            this.disable();
            workshop.sendMessage(msg).then(() => {
                $('#loading-place').html('');
                self.$('#msg-input').val('');
                self.enable();
            })
        }
    },
    triggers: {
        'click #transfer' : 'transfer:click'
    },
    keyup: function(e){
        if (e.keyCode === 13) this.sendMsg()
    },
    disable: function(){
        this.$('#send-msg').addClass('disabled');
        this.$('#msg-input').attr('disabled',true);
    },
    enable: function(){
        this.$('#send-msg').removeClass('disabled');
        this.$('#msg-input').removeAttr('disabled');
    }
})