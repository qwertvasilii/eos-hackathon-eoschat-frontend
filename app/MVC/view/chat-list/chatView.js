import Marionette from 'backbone.marionette';
import template from './templates/chat-template.jst';
import store from '../../controller/appStore';
import workshop from '../../controller/appWorkshop';

export default Marionette.View.extend({
    template: template,
    className: 'row',
    initialize: function(){
        // this.model.on('change', this.render, this);
    },
    onRender: function(){
        $('#tool').css('display','flex');
        if (this.model.get('from') === store.getNickname()) {
            this.$('.message').addClass('offset-md-7');
        }
       
    },
    onAttach: function(){
        this.trigger('chat:scroll');
        if (this.model.get('skip')) this.remove();
        else {
            try {
                let decoded = workshop.decryptMessage(this.model.get('message'))
                this.$('.message').html(decoded)
            } catch(e) {
                this.remove();
            }
        }
    }
})