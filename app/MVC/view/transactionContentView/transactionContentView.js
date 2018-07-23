import Marionette from 'backbone.marionette';
import template from './templates/transaction-content-template.jst';
import workshop from '../../controller/appWorkshop';
import ChatListView from '../chat-list/chatListView';
import store from '../../controller/appStore';
import TransactionListView from '../transaction-list/transactionListView';

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
            self.showChildView('userList', new TransactionListView({collection: store.store.transactions}));
    },
    onAttach: function(){
        ////!!!!!
        if($(window).width() <= 991){
            $('.right').addClass('d-none');
        }
        /////
    }
})