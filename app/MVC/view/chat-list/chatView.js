import Marionette from 'backbone.marionette';
import template from './templates/chat-template.jst';
import store from '../../controller/appStore';
import workshop from '../../controller/appWorkshop';

export default Marionette.View.extend({
    template: template,
    className: 'messages__body row',
    initialize: function(){
        // this.model.on('change', this.render, this);
    },
    onRender: function(){
        $('.send-message').removeClass('d-none');
        if (this.model.get('from') === store.getNickname()) {
            this.$('.messages__item').addClass('messages__item--me');
        }
       
    },
    onAttach: function(){
        this.trigger('chat:scroll');
        if (this.model.get('skip')) this.remove();
        else {
            try {
                let decoded = workshop.decryptMessage(this.model.get('message'))
                this.$('.messages__item').html(this.escapeHtml(decoded))
            } catch(e) {
                this.remove();
            }
        }
    },
    escapeHtml(unsafe) {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
     }
})