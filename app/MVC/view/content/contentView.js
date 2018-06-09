import Marionette from 'backbone.marionette';
import template from './templates/content-template.jst';
import UserListView from '../user-list/userListView';
import UserList from '../../model/collections/UserList';
import LoadingView from '../loading/loadingView';
import workshop from '../../controller/appWorkshop';

export default Marionette.View.extend({
    template: template,
    className: 'row content',
    regions: {
        userList: {
            el: '#user-list',
            replaceElement: true
        }
    },
    onRender: function(){
        // this.showChildView('userList', new UserListView({collection: new UserList()}));
        let self = this;
        this.showChildView('userList', new LoadingView())
        let users = new UserList();
        users.fetch().then(() => {
            return workshop.loadMessages(users);
        }).then(() => {
            self.showChildView('userList', new UserListView({collection: users}));
        })
        // this.showChildView('userList', new UserListView({collection: new UserList([
        //     {nickname: '123', pubKey: 'sjnfvspdfbv'},
        //     {nickname: '123', pubKey: 'sjnfvspdfbv'},
        //     {nickname: '123', pubKey: 'sjnfvspdfbv'},
        //     {nickname: '123', pubKey: 'sjnfvspdfbv'},
        //     {nickname: '123', pubKey: 'sjnfvspdfbv'},
        //     {nickname: '123', pubKey: 'sjnfvspdfbv'},
        //     {nickname: '123', pubKey: 'sjnfvspdfbv'},
        //     {nickname: '123', pubKey: 'sjnfvspdfbv'},
        //     {nickname: '123', pubKey: 'sjnfvspdfbv'},
        //     {nickname: '123', pubKey: 'sjnfvspdfbv'},
            
        // ])}));
    },
    onChildviewChatSelected: function(model) {
        console.log(model);
    }
})