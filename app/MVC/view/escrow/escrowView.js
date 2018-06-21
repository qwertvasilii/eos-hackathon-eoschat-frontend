import Marionette from 'backbone.marionette';
import template from './templates/escrow-template.jst';

export default Marionette.View.extend({
    template: template,
    className: 'container',
    attributes: {
        id: 'escrow-div'
    },
    events: {
        'click #close-escrow' : 'close',
    },
    close: function(){
        this.remove();
    },
})