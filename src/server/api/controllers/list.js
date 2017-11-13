const mongoose = require('mongoose'),
    List = mongoose.model('List');

exports.list_all_lists = function(req, res) {
    List.find({}, function(err, list) {
        if (!badRequest(err, res)) {
            res.status(200);
            res.send(list);
        }
    });
};

exports.create_list = function (req, res) {
    List.create(req.body, function (err, list) {
        if (!badRequest(err, res)) {
            res.status(201);
            res.send(list);
        }
    });
};

exports.get_list = function (req, res) {
    List.findOne({_id: req.params.listId}, function (err, list) {
        if (!badRequest(err, res)) {
            if (!list) {
                listNotFound(res);
            } else {
                res.status(200);
                res.send(list || {});
            }
        }
    });
};

exports.update_list = function (req, res) {
    List.findOneAndUpdate({_id: req.params.listId}, req.body, {new: true}, function (err, list) {
        if (!badRequest(err, res)) {
            if (!list) {
                listNotFound(res);
            } else {
                res.status(200);
                res.send(list)
            }
        }
    });
};

exports.remove_list = function (req, res) {
    List.findOneAndRemove({_id: req.params.listId}, function (err, list) {
        if (!badRequest(err, res)) {
            if (!list) {
                listNotFound(res);
            } else {
                res.status(204);
                res.send('');
            }
        }
    });
};

exports.add_item_in_list = function (req, res) {
    List.findOneAndUpdate({_id: req.params.listId}, {$push: {items: req.body}}, {new: true}, function (err, list) {
        if (!badRequest(err, res)) {
            res.status(200);
            res.json(list);
        }
    });
};

exports.get_items_in_list = function (req, res) {
    List.findOne({_id: req.params.listId}, function (err, list) {
        if (!badRequest(err, res)) {
            if (!list)
                listNotFound(res);
            else {
                res.status(200);
                res.send(list.items);
            }
        }
    });
};

exports.get_item_in_list = function (req, res) {
    List.findOne({_id: req.params.listId}, function (err, list) {
        if (!badRequest(err, res)) {
            if (!list)
                listNotFound(res);

            const item = list.items.id(req.params.itemId);

            if (!item)
                itemNotFound(res);
            else {
                res.status(200);
                res.send(item);
            }
        }
    });
};

exports.remove_item_in_list = function (req, res) {
    List.findOneAndUpdate({_id: req.params.listId}, {$pull: {items: {_id: req.params.itemId}}}, {new: true}, function (err, list) {
        if (!badRequest(err, res)) {
            if (!list) {
                listNotFound(res);
            } else {
                res.status(200);
                res.send(list);
            }
        }
    });
};

exports.update_item_in_list = function (req, res) {
    List.findOneAndUpdate({
            _id: req.params.listId,
            "items._id": req.params.itemId
        },
        {$set: {"items.$.item": req.body.item}},
        {new: true}, function (err, list) {
            if (!badRequest(err, res)) {
                if (!list) {
                    listNotFound(res);
                } else {
                    res.status(200);
                    res.send(list);
                }
            }
        }
    );
};

function listNotFound(res) {
    res.status(404);
    res.send({error: 'List not found.'})
}

function itemNotFound(res) {
    res.status(404);
    res.send({error: 'Item not found.'})
}

function badRequest(err, res) {
    if (err) {
        res.status(400);
        res.send(err);
        return true;
    }
    return false;
}