import Marionette from 'backbone.marionette';
import template from './templates/user-template.jst';
import captain from '../../../img/captain.png';

export default Marionette.View.extend({
    template: template,
    className: 'row user-contact',
    templateContext: {
        avatar: captain
    },
    triggers: {
        'click' : 'contact:select'
    },
    removeSelected: function() {
        this.$el.removeClass('selected');
    },
    select: function() {
        this.$el.addClass('selected');
    },
    initialize: function(){
        this.model.on('change', this.render, this);
    }
})