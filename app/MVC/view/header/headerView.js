import Marionette from 'backbone.marionette';
import template from './templates/header-template.jst';
import store from '../../controller/appStore';
import Identicon from 'identicon.js';
import md5 from 'md5'

export default Marionette.View.extend({
    template: template,
    className: 'profile',
    initialize: function(){
        store.store.balance.on('change', this.changeBalance, this)
        this.inChat = false;
    },
    events: {
        'click .profile__back' : 'profileBack'
    },
    triggers: {
        'click .profile__back' : 'profile:back'
    },
    templateContext: function() {
        return {
            balance: store.store.balance.get('amount') || '<i class="fa fa-spinner fa-pulse"></i>',
            nickname: store.getNickname(),
            avatar: new Identicon(md5(store.getNickname()), {size: 60}).toString()
        }
    },
    changeBalance: function(){
        if (!this.inChat) {
            this.$('.profile__balance').html('Balance: ' + store.store.balance.get('amount'))
        }
    },
    selectChat: function(model) {
        if($(window).width() <= 991){
            this.$('.profile__back').removeClass('d-none');
            this.$('.profile__balance').addClass('d-none');
            this.$('.profile__name').html(model.get('username'))
            this.$('.profile__photo').attr('src', "data:image/png;base64," + new Identicon(md5(model.get('username')), {size: 60}).toString())
            this.inChat = true;
        }
    },
    profileBack: function(){
        this.inChat = false;
        this.render();
    }
})