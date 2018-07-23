import Marionette from 'backbone.marionette';
import template from './templates/mnemonic-root-template.jst';
import HeaderView from '../header/headerView';
import FooterView from '../footer/footerView';
import MnemonicView from '../mnemonic/mnemonicView';

export default Marionette.View.extend({
    template: template,
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
        // this.showChildView('footer', new FooterView()); 
        // this.showChildView('header', new HeaderView());
        this.showChildView('content', new MnemonicView());
    },
})