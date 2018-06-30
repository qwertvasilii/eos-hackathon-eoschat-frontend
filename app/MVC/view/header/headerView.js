import Marionette from 'backbone.marionette';
import template from './templates/header-template.jst';
import SearchView from '../search/searchView';
import './templates/header.css';
import store from '../../controller/appStore';
import workshop from '../../controller/appWorkshop';

export default Marionette.View.extend({
    template: template,
    className: 'row header',
    initialize: function(){
        store.store.balance.on('change', this.changeBalance, this)
    },
    regions: {
        search: {
            el: '#search',
            replaceElement: true
        }
    },
    events: {
        'click #mnemonic-href' : 'mnemonicRedirect'
    },
    templateContext: function() {
        return {
            balance: store.store.balance.get('amount') || '<i class="fa fa-spinner fa-pulse"></i>',
            nickname: store.getNickname(),
            mnemonicSaved: workshop.getMnemonicSaved()
        }
    },
    onRender: function(){
        if (!Backbone.history.getFragment()) {
            this.showChildView('search', new SearchView())
        }
    },
    mnemonicRedirect: function(e){
        e.preventDefault();
        Backbone.history.navigate('/mnemonic', {trigger: true});
    },
    changeBalance: function(){
        this.$('#balance-field').html('Balance: ' + store.store.balance.get('amount'))
    }
})