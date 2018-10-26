import React, {PureComponent} from 'react';
import 'bootstrap/dist/css/bootstrap.css'


class Article extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }


    render() {
        console.log('----', 2);
        const {article, isOpen, onButtonClick} = this.props;
        const body = isOpen && <section className="card-text">{article.text}</section>;


        return (
            <div className="card mx-auto" style={{width: '50%'}}>
                <div className="card-header">
                    <h2>{article.title}&emsp;
                        viewed {this.state.count}
                        <button className="btn btn-primary btn-lg float-right btnClass" onClick={
                            () => {
                                onButtonClick();
                                incrementCounter.bind(this);
                            }
                        }>
                            {isOpen ? 'Close' : 'Open'}
                        </button>
                    </h2>
                </div>

                <div className="card-body">
                    <h6 className="card-subtitle text-muted">
                        creation date:{article.date}
                    </h6>
                    {body}
                    <code>

                    </code>
                </div>

            </div>

        )
    }
}


var incrementCounter = function () {
    console.log("I am here");
    this.setState({
        count: !this.state.isOpen ? this.state.count + 1 : this.state.count,
    })

}


export default Article;