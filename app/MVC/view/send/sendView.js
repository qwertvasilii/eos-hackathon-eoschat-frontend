import Marionette from 'backbone.marionette';
import template from './templates/send-template.jst';
import workshop from '../../controller/appWorkshop';
import Inputmask from 'inputmask';

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
    onAttach: function(){
        let im = new Inputmask({regex: String.raw`\d+(\.\d{4})?`});
        im.mask('#amount-input')
    },
    send: function(){
        let amount = parseFloat(this.$('#amount-input').val());
        let self = this;
        if (amount) {
            workshop.transfer(amount).then(data => {
                self.remove();
            })
        }
    }
})