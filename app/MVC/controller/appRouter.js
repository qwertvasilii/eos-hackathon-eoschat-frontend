import Marionette from 'backbone.marionette';
import controller from './appController';

export default Marionette.AppRouter.extend({
    initialize: function(){
        this.controller = new controller();
    },
    appRoutes: {
        'login(/)' : 'showLogin'
    }
})