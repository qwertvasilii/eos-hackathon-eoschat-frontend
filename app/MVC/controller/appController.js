import Marionette from 'backbone.marionette';
import App from './App';

export default Marionette.Object.extend({
    initialize: function(){
        let app = new App();
        app.start();
        this.options.app = app;
    },
    showLogin: function(){
        let app = this.options.app;
        app.showLogin();
    }
})