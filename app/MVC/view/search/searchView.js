import Marionette from 'backbone.marionette';
import template from './templates/search-template.jst';

export default Marionette.View.extend({
    template: template,
    className: 'col-md-3',
    attributes: {
        id: 'search-box'
    }
})