import Marionette from 'backbone.marionette';
import App from './App';
import workshop from './appWorkshop';
import Backbone from 'backbone';
import store from './appStore';

export default Marionette.Object.extend({
    initialize: function(){
        let app = new App();
        app.start();
        this.options.app = app;
    },
    loadData: function(){
        return new Promise((resolve, reject) => {
            if (store.firstLoaded()) resolve();
            else {
                Backbone.loading.show();
                store.loadFirst().then(() => {
                    store.startPolling();
                    Backbone.loading.hide();
                    resolve();
                })
            }
        })
    },
    showRoot: function(){
        if (this.loggedIn() && this.mnemonicSaved()) {
            this.loadData().then(() => {
                let app = this.options.app;
                app.showRoot();
            })
        }
    },
    showTransactions: function() {
        if (this.loggedIn() && this.mnemonicSaved()) {
            this.loadData().then(() => {
                let app = this.options.app;
                app.showTransactions();
            })
        }
    },
    showLogin: function(){
        if (!workshop.getLoggedIn()) {
            let app = this.options.app;
            app.showLogin();
        } else {
            Backbone.history.navigate('/', {trigger : true});
        }
    },
    showMnemonic: function(){
        if (this.loggedIn()) {
            if (this.mnemonicSaved()) {
                Backbone.history.navigate('/', {trigger: true});
            } else {
                this.loadData().then(() => {
                    let app = this.options.app;
                    app.showMnemonic();
                })
            }
        }
    }, 
    loggedIn: function(){
        if (workshop.getLoggedIn()) return true;
        else {
            Backbone.history.navigate('/login', {trigger : true});
            return false;
        }
    },
    mnemonicSaved: function(){
        if (workshop.getMnemonicSaved()) return true;
        else {
            Backbone.history.navigate('/mnemonic', {trigger : true});
            return false;
        }
    }
})