import Marionette from 'backbone.marionette';
import template from './templates/send-template.jst';
import workshop from '../../controller/appWorkshop';
import Inputmask from 'inputmask';
import store from '../../controller/appStore'

export default Marionette.View.extend({
    template: template,
    className: 'modal fade',
    attributes: {
        id: 'send-eos',
        tabindex: '-1',
        role: 'dialog',
        "aria-hidden": "true"
    },
    events: {
        'click #send' : 'send',
        'hidden.bs.modal' : 'remove'
    },
    onAttach: function(){
        this.$el.modal('show')
        let im = new Inputmask({regex: String.raw`\d+(\.\d{4})?`});
        im.mask('#amount-input')
    },
    send: function(){
        this.$('#helper-error').html('')
        let amount = parseFloat(this.$('#amount-input').val());
        let self = this;
        let balance = parseFloat(store.store.balance.get('amount').split(' ')[0])
        if (!amount) {
            this.$('#helper-error').html('Enter amount')
        } else if (amount > balance) {
            this.$('#helper-error').html('Amount is bigger than your balance')
        } else {
            const result = confirm('Confirm sending')
            if (amount && result) {
                workshop.transfer(amount).then(data => {
                    self.$el.modal('hide');
                })
            }
        }
    }
})