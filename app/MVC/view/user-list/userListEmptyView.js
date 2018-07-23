import Marionette from 'backbone.marionette';
import template from './templates/user-list-empty-template.jst';

export default Marionette.View.extend({
    template: template,
    className: 'contacts__item',
    attributes: {
        style: 'padding: 7px 15px'
    }
})