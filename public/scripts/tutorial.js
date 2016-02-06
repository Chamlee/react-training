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
 *
 * Look how CommentList and CommentForm are "injected"
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
                <Comment author="Pete Hunt">This is one comment</Comment>
                <Comment author="Jordan Walke">This is *another* comment</Comment>
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
 *
 * this.props => access to its commentList parent
 */
var Comment = React.createClass({
    //Protect from XSS attacks
    rawMarkup: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    },

    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    { this.props.author }
                </h2>
                {marked(this.props.children.toString())}
            </div>
        );
    }
});


ReactDOM.render(
    < CommentBox />,
    document.getElementById('content')
);
