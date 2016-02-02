/**
 * Created by nono on 02/02/16.
 *
 * - CommentBox
 *     - CommentList
 *         - Comment
 *      - CommentForm
 */

/**
 * CommentBox.js
 */
var CommentBox = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});

/**
 * CommentListForm.js
 */
var CommentList = React.createClass({
    render: function () {
        return (
            <div className="commentList">
                This is the commentList
            </div>
        );
    }
});
var CommentForm = React.createClass({
    render: function () {
        return (
            <div className="commentForm">
                This is the commentForm
            </div>
        );
    }
});

/**
 * Comment.js
 */
var Comment = React.createClass({
    render: function () {
        return (
            <div className="comment">
            
            </div>
        );
    }
});


ReactDOM.render(
    < CommentBox />,
    document.getElementById('content')
);
