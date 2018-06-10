import Marionette from 'backbone.marionette';
import ChatView from './chatView';
import config from '../../controller/appConfig';

export default Marionette.CollectionView.extend({
    childView: ChatView,
    className: 'container col-md-9',
    attributes: {
        id: 'chat-box'
    },
    onRender: function(){
        let state = JSON.parse(localStorage.getItem(config.localStorageChatKeysPrefix + localStorage.getItem('selected-chat-user')));
        let count = 0;
        if (state.send) count++;
        if (state.received) count++;
        for (let i = 0; i < count; i++) {
            let msg = this.collection.at(i);
            if (msg) {
                msg.set('skip', true)
                this.collection.remove(msg);
            }
        }
    },
    onAttach: function(){
        // this.$el.scrollTop(this.$el.prop('scrollHeight'))
        this.$el.animate({
            scrollTop: this.$el.prop('scrollHeight')
        }, 700)
    }
})