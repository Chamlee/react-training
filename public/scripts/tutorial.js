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
 * If state is updated the component update itself
 */
var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    //Automaticlly loaded
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
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
    getInitialState: function() {
        return {author: '', text: ''};
    },
    authorChange: function(element) {
        this.setState({author: element.target.value});
    },
    textChange: function(element) {
        this.setState({text: element.target.value});
    },
    formSubmit: function(element) {
        element.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        
        if (!text || !author) {
            return;
        }
        // TODO: send request to the server
        this.setState({author: '', text: ''});
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.formSubmit}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.authorChange}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.textChange}/>
                <input type="submit" value="Post" />
            </form>
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
    < CommentBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
);
