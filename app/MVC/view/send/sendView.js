import Marionette from 'backbone.marionette';
import template from './templates/send-template.jst';
import workshop from '../../controller/appWorkshop';

export default Marionette.View.extend({
    template: template,
    className: 'container',
    attributes: {
        id: 'send-div'
    },
    events: {
        'click #close-send' : 'close',
        'click #send' : 'send'
    },
    close: function(){
        this.remove();
    },
    send: function(){
        let amount = this.$('#amount-input').val();
        let self = this;
        if (amount) {
            workshop.transfer(amount).then(data => {
                self.remove();
            })
        }
    }
})