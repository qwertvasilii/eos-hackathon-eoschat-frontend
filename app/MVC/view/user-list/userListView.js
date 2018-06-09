import Marionette from 'backbone.marionette';
import UserListEmptyView from './userListEmptyView';
import UserView from './userView';
import './templates/user-list.css';

export default Marionette.CollectionView.extend({
    childView: UserView,
    emptyView: UserListEmptyView,
    className: 'col-md-3',
    attributes: {
        id: 'user-list'
    },
    onChildviewContactSelect: function(view){
        this.children.forEach(_view => {
            _view.removeSelected();
        })
        view.select();
        this.trigger('chat:selected', view.model);
    }
})