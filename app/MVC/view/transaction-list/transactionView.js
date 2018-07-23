import Marionette from 'backbone.marionette';
import template from './templates/transaction-template.jst';
import store from '../../controller/appStore';

export default Marionette.View.extend({
    template: template,
    className: 'txs__item',
    templateContext: {
        user: store.getNickname()
    }
})