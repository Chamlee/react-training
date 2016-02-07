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
                <CommentList data={this.props.data} />
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
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                { commentNodes }
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
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});


ReactDOM.render(
    < CommentBox url="/api/comments" />,
    document.getElementById('content')
);
