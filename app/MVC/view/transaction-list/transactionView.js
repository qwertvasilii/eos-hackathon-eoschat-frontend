import Marionette from 'backbone.marionette';
import template from './templates/transaction-template.jst';
import store from '../../controller/appStore';

export default Marionette.View.extend({
    template: template,
    className: 'row user-contact',
    onRender: function(){
        console.log(this.model)
    },
    templateContext: {
        user: store.getNickname()
    }
})