import Marionette from 'backbone.marionette';
import template from './templates/user-template.jst';
import captain from '../../../img/captain.png';
import Identicon from 'identicon.js';
import md5 from 'md5'

export default Marionette.View.extend({
    template: template,
    className: 'row user-contact',
    templateContext: function(){
        return {
            avatar: new Identicon(md5(this.model.get('account_name'))).toString()
        }
    },
    triggers: {
        'click' : 'contact:select'
    },
    onAttach: function(){
        if (this.model.get('account_name') === localStorage.getItem('selected-chat-user')) {
            this.select();
        }
    },
    removeSelected: function() {
        this.$el.removeClass('selected');
    },
    select: function() {
        this.$el.addClass('selected');
    },
    initialize: function(){
        this.model.on('change', this.render, this);
    }
})