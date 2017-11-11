const mongoose = require('mongoose'),
    List = mongoose.model('List');

exports.list_all_lists = function(req, res) {
    List.find({}, function(err, list) {
        if (err)
            res.send(err);
        res.status(200);
        res.json(list);
    });
};

exports.get_list = function (req, res) {
    List.findOne({_id: req.params.listId}, function (err, list) {
        if (err)
            res.send(err);
        if (!list) {
            notFound(res);
        } else {
            res.status(200);
            res.json(list || {});
        }
    });
};

exports.update_list = function (req, res) {
    List.findOneAndUpdate({_id: req.params.listId}, {new: true}, function (err, list) {
        if (err)
            res.send(err);
        if (!list) {
            notFound(res);
        } else {
            res.status(200);
            res.send(list)
        }
    });
};

exports.remove_list = function (req, res) {
    List.findOneAndRemove({_id: req.params.listId}, function (err, list) {
        if (err)
            res.send(err);
        if (!list) {
            notFound(res);
        } else {
            res.status(204);
            res.send('');
        }
    });
};

exports.create_list = function (req, res) {
    List.create(req.body, function (err, list) {
        if (err)
            res.send(err);
        res.status(201);
        res.json(list);
    });
};

exports.add_item_on_list = function (req, res) {
    List.findOneAndUpdate({_id: req.params.listId}, {$push: {items: req.body}}, {new: true}, function (err, list) {
        if (err)
            res.send(err);
        res.status(200);
        res.json(list);
    });
};

exports.remove_item_on_list = function (req, res) {
    List.findOneAndUpdate({_id: req.params.listId}, {$pull: {items: {_id: req.params.itemId}}}, {new: true}, function (err, list) {
        if (!list) {
            notFound(res);
        } else {
            res.status(200);
            res.send(list);
        }
    });
};

exports.update_item_on_list = function (req, res) {
    List.findOneAndUpdate({
            _id: req.params.listId,
            "items._id": req.params.itemId
        },
        {$set: {"items.$.item": req.body.item}},
        {new: true}, function (error, list) {
            if (!list) {
                notFound(res);
            } else {
                res.status(200);
                res.send(list);
            }
        }
    );
};

function notFound(res) {
    res.status(404);
    res.send({error: 'List not found.'})
};