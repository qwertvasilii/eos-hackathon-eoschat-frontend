import Marionette from 'backbone.marionette';
import template from './templates/header-template.jst';
import SearchView from '../search/searchView';
import './templates/header.css';

export default Marionette.View.extend({
    template: template,
    className: 'row header',
    regions: {
        search: {
            el: '#search',
            replaceElement: true
        }
    },
    onRender: function(){
        this.showChildView('search', new SearchView())
    }
})