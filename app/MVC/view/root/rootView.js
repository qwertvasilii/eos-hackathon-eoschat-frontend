import Marionette from 'backbone.marionette';
import template from './templates/root-template.jst';
import FooterView from '../footer/footerView';
import HeaderView from '../header/headerView';
import ContentView from '../content/contentView';

export default Marionette.View.extend({
    template: template,
    className: 'container h-100',
    attributes: {
        id: 'root'
    },
    regions: {
        footer: {
            el: '#footer',
            replaceElement: true
        },
        content: {
            el: '#content',
            replaceElement: true
        }
    },
    onRender: function(){
        this.showChildView('footer', new FooterView()); 
        this.showChildView('content', new ContentView());
    },
    onChildviewBlock: function(){
        this.getChildView('footer').blockInput();
    },
    onChildviewUnblock: function(){
        this.getChildView('footer').unblockInput();
    },
    onChildviewShowInput: function(){
        this.getChildView('footer').showInput();
    },
    onChildviewHideInput: function(){
        this.getChildView('footer').hideInput();
    }
})