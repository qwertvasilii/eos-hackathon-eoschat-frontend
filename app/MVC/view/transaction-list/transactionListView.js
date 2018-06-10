import Marionette from 'backbone.marionette';
import TransactionView from './transactionView';

export default Marionette.CollectionView.extend({
    childView: TransactionView,
    className: 'col-md-3',
    attributes: {
        id: 'user-list'
    },
})