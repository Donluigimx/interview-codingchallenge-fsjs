module.exports = function(app) {
    const listController = require('../controllers/list');

    app.route('/lists')
        .get(listController.list_all_lists)
        .post(listController.create_list);

    app.route('/lists/:listId')
        .get(listController.get_list)
        .put(listController.update_list)
        .delete(listController.remove_list);

    app.route('/lists/:listId/items')
        .post(listController.add_item_on_list);

    app.route('/lists/:listId/items/:itemId')
        .delete(listController.remove_item_on_list)
        .put(listController.update_item_on_list);
};