import Marionette from 'backbone.marionette';
import template from './templates/chat-template.jst';
import store from '../../controller/appStore';

export default Marionette.View.extend({
    template: template,
    className: 'row',
    onRender: function(){
        if (this.model.get('from') === store.getNickname()) {
            this.$('.message').addClass('offset-md-7');
        }
    }
})