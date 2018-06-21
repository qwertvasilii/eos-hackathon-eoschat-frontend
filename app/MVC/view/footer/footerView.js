import Marionette from 'backbone.marionette';
import template from './templates/footer-template.jst';
import menuView from '../../view/menu/menuView';
import toolView from '../tool/toolView';
import sendView from '../send/sendView';
import './templates/footer.css';

export default Marionette.View.extend({
    template: template,
    className: 'row footer',
    regions: {
        menu: {
            el: '.menu',
            replaceElement: true
        },
        tool: {
            el: '.tool',
            replaceElement: true
        },
        send: {
            el: '.send',
        }
    },
    onRender: function(){
        this.showChildView('menu', new menuView());
        this.showChildView('tool', new toolView());
    },
    onChildviewTransferClick: function(){
        this.showChildView('send', new sendView());
    },
    blockInput: function(){
        this.getChildView('tool').block();
    },
    unblockInput: function(){
        this.getChildView('tool').unblock();
    }
})