import Marionette from 'backbone.marionette';
import template from './templates/content-template.jst';
import UserListView from '../user-list/userListView';
import workshop from '../../controller/appWorkshop';
import ChatListView from '../chat-list/chatListView';
import store from '../../controller/appStore';
import ChatList from '../../model/collections/ChatList'

export default Marionette.View.extend({
    template: template,
    className: 'row content',
    regions: {
        userList: {
            el: '#user-list',
            replaceElement: true
        },
        chatBox: {
            el: '#chat-box',
            replaceElement: true
        }
    },
    onRender: function(){
            let self = this;
            self.showChildView('userList', new UserListView({collection: store.getUsers()}));
    },
    onChildviewChatSelected: function(model) {
        if (model.get('account_name') !== localStorage.getItem('selected-chat-user')) {
            localStorage.setItem('selected-chat-user', model.get('account_name'));
            let self = this;
            if (self.getChildView('chatBox')) this.getChildView('chatBox').$el.html('');
            workshop.checkKeys(model).then(function() {
                if (self.getChildView('chatBox')) {
                    self.getChildView('chatBox').collection = model.get('messages');
                    self.getChildView('chatBox').options.user = model;
                    self.getChildView('chatBox').render();
                } else {
                    self.showChildView('chatBox', new ChatListView({collection: model.get('messages'), user: model}));
                }
            })
        }
    },
    onChildviewUnblock: function(){
        this.trigger('unblock');
    },
    onChildviewBlock: function(){
        this.trigger('block')
    }
})