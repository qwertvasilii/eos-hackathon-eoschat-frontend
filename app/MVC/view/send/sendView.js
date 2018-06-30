import Marionette from 'backbone.marionette';
import template from './templates/send-template.jst';
import workshop from '../../controller/appWorkshop';
import Inputmask from 'inputmask';
import store from '../../controller/appStore'

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
        this.$('#helper-error').html('')
        let amount = parseFloat(this.$('#amount-input').val());
        let self = this;
        let balance = parseFloat(store.store.balance.get('amount').split(' ')[0])
        if (amount > balance) {
            this.$('#helper-error').html('Amount is bigger than your balance')
        } else {
            const result = confirm('Confirm sending')
            if (amount && result) {
                workshop.transfer(amount).then(data => {
                    self.remove();
                })
            }
        }
    }
})