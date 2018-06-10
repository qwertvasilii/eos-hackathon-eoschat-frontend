import Marionette from 'backbone.marionette';
import LoginView from '../view/login/loginView';
import rootView from '../view/root/rootView';
import transactionRootView from '../view/transactionRoot/transactionRootView';

export default Marionette.Application.extend({
    region: '#app',
    showLogin: function(){
        this.showView(new LoginView());
    },
    showRoot: function(){
        this.showView(new rootView());
    },
    showTransactions: function(){
        this.showView(new transactionRootView())
    }
})