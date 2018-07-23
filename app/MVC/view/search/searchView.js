import Marionette from 'backbone.marionette';
import template from './templates/search-template.jst';
import store from '../../controller/appStore';

export default Marionette.View.extend({
    template: template,
    className: 'search-contacts',
    attributes: {
        id: 'search-box'
    },
    events: {
        'input input' : 'inputChange'
    },
    inputChange: function(){
        store.getUsers().trigger('search', this.$('input').val())
    },
    hide: function() {
        this.$el.addClass('d-none');
    },
    show: function(){
        this.$el.removeClass('d-none');
    }
})