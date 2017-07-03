import React from 'react';

export default class Footer extends React.Component {
    render() {

        const style = {
            backgroundColor: "#F8F8F8",
            borderTop: "1px solid #E7E7E7",
            bottom: "0",
            height: "60px",
            padding: "20px",
            position: "fixed",
            textAlign: "center",
            width: "100%"
        }

        return (
            <div className="footer" style={style}>
                <p>created by <a href="http://www.github.com/yongching">yong ching</a></p>
            </div>
        );
    }
}

