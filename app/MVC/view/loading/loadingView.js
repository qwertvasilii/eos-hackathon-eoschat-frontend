import Marionette from 'backbone.marionette';
import template from './templates/loading-template.jst';

export default Marionette.View.extend({
    template: template,
    className: function(){
        return 'col-md-3'
    },
    attributes: function(){
        return {
            id: 'user-list'
        }
    }
})