import Marionette from 'backbone.marionette';
import LoginView from '../view/login/loginView';
import rootView from '../view/root/rootView';

export default Marionette.Application.extend({
    region: '#app',
    showLogin: function(){
        this.showView(new LoginView());
    },
    showRoot: function(){
        this.showView(new rootView());
    }
})