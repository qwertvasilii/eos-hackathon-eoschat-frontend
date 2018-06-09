import Marionette from 'backbone.marionette';
import template from './templates/root-template.jst';
import './templates/root.css';
import FooterView from '../footer/footerView';
import HeaderView from '../header/headerView';
import ContentView from '../content/contentView';

export default Marionette.View.extend({
    template: template,
    className: 'container-fluid',
    attributes: {
        id: 'root'
    },
    regions: {
        footer: {
            el: '.footer',
            replaceElement: true
        },
        header: {
            el: '.header',
            replaceElement: true
        },
        content: {
            el: '.content',
            replaceElement: true
        }
    },
    onRender: function(){
        this.showChildView('footer', new FooterView()); 
        this.showChildView('header', new HeaderView());
        this.showChildView('content', new ContentView());
    }
})