import Marionette from 'backbone.marionette';
import LoginView from '../view/login/loginView';

export default Marionette.Application.extend({
    region: '#app',
    showLogin: function(){
        this.showView(new LoginView());
    }
})