import Marionette from 'backbone.marionette';
import template from './templates/escrow-template.jst';

export default Marionette.View.extend({
    template: template,
    className: 'modal fade',
    attributes: {
        id: 'escrow-modal',
        tabindex: '-1',
        role: 'dialog',
        "aria-hidden": "true"
    },
    onAttach: function(){
        this.$el.modal('show')
    },
    events: {
        'hidden.bs.modal' : 'remove'
    },
})