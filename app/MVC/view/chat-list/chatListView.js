import Marionette from 'backbone.marionette';
import ChatView from './chatView';

export default Marionette.CollectionView.extend({
    childView: ChatView,
    className: 'container col-md-9',
    attributes: {
        id: 'chat-box'
    },
    onAttach: function(){
        // this.$el.scrollTop(this.$el.prop('scrollHeight'))
        this.$el.animate({
            scrollTop: this.$el.prop('scrollHeight')
        }, 700)
    }
})