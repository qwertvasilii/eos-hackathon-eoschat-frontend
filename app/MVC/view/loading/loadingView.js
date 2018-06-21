import Marionette from 'backbone.marionette';
import template from './templates/loading-template.jst';

export default Marionette.View.extend({
    el: '#loading-div',
    template: template,
    templateContext: {
        svg: 'sdf'
    }
})