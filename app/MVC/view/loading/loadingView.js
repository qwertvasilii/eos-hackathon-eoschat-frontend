import Marionette from 'backbone.marionette';
import template from './templates/loading-template.jst';
import loadingSvg from '../../../img/infinity.svg';

export default Marionette.View.extend({
    el: '#loading-div',
    template: template,
    templateContext: {
        svg: loadingSvg
    },
    show: function(){
        this.$("#fade").css('display', 'block');
        this.$('#modal').css('display', 'block');
    },
    hide: function(){
        this.$("#fade").css('display', 'none');
        this.$('#modal').css('display', 'none');
    }
})

