import Marionette from 'backbone.marionette';
import template from './templates/footer-template.jst';
import menuView from '../../view/menu/menuView';
import './templates/footer.css';

export default Marionette.View.extend({
    template: template,
    className: 'row footer',
    regions: {
        menu: {
            el: '.menu',
            replaceElement: true
        }
    },
    onRender: function(){
        this.showChildView('menu', new menuView());
    }
})