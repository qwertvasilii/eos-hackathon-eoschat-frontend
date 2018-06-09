import Marionette from 'backbone.marionette';
import template from './templates/menu-template.jst';
import './templates/menu.css';
import store from '../../controller/appStore';
import Backbone from 'backbone';

export default Marionette.View.extend({
    template: template,
    className: 'col-md-3 text-center menu',
    events: {
        'click #logout' : 'logout'
    },
    logout: function(){
        store.clear();
        Backbone.history.navigate('/login', {trigger : true});
    }
})