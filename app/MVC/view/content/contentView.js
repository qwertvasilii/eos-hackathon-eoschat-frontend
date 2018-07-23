import Marionette from 'backbone.marionette';
import template from './templates/content-template.jst';
import UserListView from '../user-list/userListView';
import workshop from '../../controller/appWorkshop';
import ChatListView from '../chat-list/chatListView';
import store from '../../controller/appStore';
import headerView from '../header/headerView';
import searchView from '../search/searchView';

export default Marionette.View.extend({
    template: template,
    className: 'row',
    regions: {
        userList: {
            el: '#user-list',
            replaceElement: true
        },
        chatBox: {
            el: '#chat-box',
            replaceElement: true
        },
        profile: {
            el: '#profile',
            replaceElement: true
        },
        search: {
            el: '#search',
            replaceElement: true
        }
    },
    onAttach: function(){
        ///!!!!!
        if($(window).width() <= 991){
            this.$('.right').addClass('d-none');
        }
        /////
    },
    onRender: function(){
        this.showChildView('userList', new UserListView({collection: store.getUsers()}));
        this.showChildView('profile', new headerView())
        this.showChildView('search', new searchView())
    },
    onChildviewChatSelected: function(model) {
        if (model.get('account_name') !== localStorage.getItem('selected-chat-user')) {
            localStorage.setItem('selected-chat-user', model.get('account_name'));
            let self = this;
            if (self.getChildView('chatBox')) this.getChildView('chatBox').$el.html('');
            workshop.checkKeys(model).then(function() {
                self.showChildView('chatBox', new ChatListView({collection: model.get('messages'), user: model}));
                self.getChildView('profile').selectChat(model);
                if($(window).width() <= 991){
                    self.getChildView('search').hide();
                    self.getChildView('userList').hide();
                    self.getChildView('chatBox').show();
                    self.trigger('show:input');
                }
            })
            
        }
    },
    onChildviewProfileBack: function(){
        if($(window).width() <= 991){
            localStorage.removeItem('selected-chat-user')
            this.getChildView('search').show();
            this.getChildView('userList').show();
            this.getChildView('chatBox').hide();
            this.trigger('hide:input');
        }
    },
    onChildviewUnblock: function(){
        this.trigger('unblock');
    },
    onChildviewBlock: function(){
        this.trigger('block')
    }
})