import Marionette from 'backbone.marionette';
import UserListEmptyView from './userListEmptyView';
import UserView from './userView';
import './templates/user-list.css';
import UserList from '../../model/collections/UserList';

export default Marionette.CollectionView.extend({
    childView: UserView,
    emptyView: UserListEmptyView,
    className: 'col-md-3',
    initialize: function(){
        this.initialCollection = this.collection
        this.initialCollection.on('search', this.search, this);
    },
    attributes: {
        id: 'user-list'
    },
    onChildviewContactSelect: function(view){
        this.children.forEach(_view => {
            _view.removeSelected();
        })
        view.select();
        this.trigger('chat:selected', view.model);
    },
    search: function(search) {
        if (search) {
            this.collection = new UserList(this.initialCollection.filter(item => {
                return item.get('account_name').indexOf(search) != -1;
            }))
        } else {
            this.collection = this.initialCollection;            
        }
        this.render();
    }
})