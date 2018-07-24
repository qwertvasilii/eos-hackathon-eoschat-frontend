import Marionette from 'backbone.marionette';
import template from './templates/mnemonic-template.jst';
import store from '../../controller/appStore';
export default Marionette.View.extend({
    template: template,
    templateContext: function(){
        return {
            seedPhrase: store.getMnemonic()
        }
    },
    events: {
        'click #mnemonic-saved' : 'mnemonicSaved'
    },
    mnemonicSaved: function(){
        store.mnemonicSaved();
        Backbone.history.navigate('/', {trigger: true});
    }
})