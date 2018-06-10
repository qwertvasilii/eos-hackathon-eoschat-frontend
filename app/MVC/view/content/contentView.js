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
        // this.showChildView('userList', new UserListView({collection: new UserList()}));
        let self = this;
        // this.showChildView('userList', new LoadingView())
        // let users = new UserList();
        // users.fetch().then(() => {
            // return workshop.loadMessages(users);
        // }).then(() => {
            self.showChildView('userList', new UserListView({collection: store.getUsers()}));
        // })
    },
    onChildviewChatSelected: function(model) {
        localStorage.setItem('selected-chat-user', model.get('account_name'));
        let self = this;
        workshop.checkKeys(model).then(() => {
            self.showChildView('chatBox', new ChatListView({collection: model.get('messages')}));
        })
        // console.log('selected')
        // workshop.checkReceiveKeys(model)
        // workshop.checkChatKeys(model.get('account_name')).then(() => {
        //     console.log('come here')
        //     return workshop.checkReceiveKeys(model);
        // }).then(() => {
        //     console.log('render chat', model.get('messages'));
        //     if (model.get('messages').length > 2) {
        //         model.set('messages', new ChatList(model.get('messages').slice(2)));
        //         console.log(model.get('messages'))
        //         model.get('messages').forEach(_msg => {
        //             if (_msg.get('sender') === !store.getNickname()) {
        //                 _msg.set('message',workshop.decryptForeignMessage(_msg.get('message')))
        //             }
        //         })
        //     }
        //     self.showChildView('chatBox', new ChatListView({collection: model.get('messages')}))
        // })
        // this.showChildView('chatBox', new ChatListView({collection: new ChatList([
        //     {sender: 'gggg', msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
        //     {sender: 'sss', msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
        //     {sender: 'gggg', msg: 'aaa'},
        //     {sender: 'sss', msg: 'aaa'},
        //     {sender: 'gggg', msg: 'aaa'},
        //     {sender: 'gggg', msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
        //     {sender: 'sss', msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
        //     {sender: 'gggg', msg: 'aaa'},
        //     {sender: 'sss', msg: 'aaa'},
        //     {sender: 'gggg', msg: 'aaa'},
        //     {sender: 'gggg', msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
        //     {sender: 'sss', msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
        //     {sender: 'gggg', msg: 'aaa'},
        //     {sender: 'sss', msg: 'aaa'},
        //     {sender: 'gggg', msg: 'aaa'},
        //     {sender: 'gggg', msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
        //     {sender: 'sss', msg: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
        //     {sender: 'gggg', msg: 'aaa'},
        //     {sender: 'sss', msg: 'aaa'},
        //     {sender: 'gggg', msg: 'aaa'},
        // ])}))
    }
})