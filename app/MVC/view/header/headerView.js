import Marionette from 'backbone.marionette';
import template from './templates/header-template.jst';
import SearchView from '../search/searchView';
import './templates/header.css';
import store from '../../controller/appStore';
export default Marionette.View.extend({
    template: template,
    className: 'row header',
    initialize: function(){
        store.store.balance.on('change', this.render, this)
    },
    regions: {
        search: {
            el: '#search',
            replaceElement: true
        }
    },
    templateContext: function() {
        return {
            balance: store.store.balance.get('amount') || '<i class="fa fa-spinner fa-pulse"></i>',
            nickname: store.getNickname()
        }
    },
    onRender: function(){
        this.showChildView('search', new SearchView())
    }
})