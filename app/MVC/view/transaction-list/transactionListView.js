import Marionette from 'backbone.marionette';
import TransactionView from './transactionView';

export default Marionette.CollectionView.extend({
    childView: TransactionView,
    className: 'txs row',
    attributes: {
        id: 'user-list'
    },
})