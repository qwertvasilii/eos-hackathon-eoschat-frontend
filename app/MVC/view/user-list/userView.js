import Marionette from 'backbone.marionette';
import template from './templates/user-template.jst';
import Identicon from 'identicon.js';
import md5 from 'md5'

export default Marionette.View.extend({
    template: template,
    className: 'contacts__item',
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
        this.$('.contacts__chat-link').removeClass('contacts__chat-link--active');
    },
    select: function() {
        this.$('.contacts__chat-link').addClass('contacts__chat-link--active');
    },
    initialize: function(){
        this.model.on('change', this.render, this);
    }
})