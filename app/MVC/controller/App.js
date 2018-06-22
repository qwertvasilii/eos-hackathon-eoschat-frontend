import Marionette from 'backbone.marionette';
import LoginView from '../view/login/loginView';
import rootView from '../view/root/rootView';
import transactionRootView from '../view/transactionRoot/transactionRootView';
import mnemonicRootView from '../view/mnemonicRoot/mnemonicRootView';

export default Marionette.Application.extend({
    region: '#app',
    showLogin: function(){
        this.showView(new LoginView());
    },
    showRoot: function(){
        localStorage.removeItem('selected-chat-user')
        this.showView(new rootView());
    },
    showTransactions: function(){
        localStorage.removeItem('selected-chat-user')
        this.showView(new transactionRootView())
    },
    showMnemonic: function(){
        this.showView(new mnemonicRootView());
    }
})